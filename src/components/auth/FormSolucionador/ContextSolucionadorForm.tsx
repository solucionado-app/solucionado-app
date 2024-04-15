/* eslint-disable */

import { useUser } from "@clerk/nextjs";
import { type UserResource } from "@clerk/nextjs/node_modules/@clerk/types/dist/user";
import React, { createContext, useContext, useEffect, useState } from "react";
import { localRegisterSolucionador, RegisterSolucionadorFormValues } from "~/lib/localStorage";
import { api } from "~/utils/api";

interface FormStepsContextType {
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    formValues: Record<string, any>;
    setFormValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    isLoading: boolean,
    handleStepSubmission: (step: number, values: any) => Promise<unknown>;
}




const FormStepsContext = createContext<FormStepsContextType>({
    currentStep: 0,
    setCurrentStep: () => { },
    formValues: {},
    setFormValues: () => { },
    isLoading: false,
    handleStepSubmission: () => new Promise(() => { })
});

export const useFormSteps = () => useContext(FormStepsContext);

interface Props {
    children: React.ReactNode;

}

export const FormStepsProvider = ({ children }: Props) => {
    const { user } = useUser()
    const local: RegisterSolucionadorFormValues = localRegisterSolucionador.get()

    const [currentStep, setCurrentStep] = useState(0);
    const [formValues, setFormValues] = useState<Record<string, any>>({});
    const [isLoading, setIsLoading] = useState(false);

    const prismaUser = api.user.getById.useQuery(undefined, {
        enabled: !!user?.id
    })

    type userDb = typeof prismaUser.data

    const determineInitialStep = (user: UserResource, userFromdb: userDb) => {
        // if (user.id === 'user_2aEYpsnkUQjrD1kNxkagEcYXQ0N'){
        //     user.primaryPhoneNumber?.destroy()
        // }
        if (!user.hasVerifiedPhoneNumber || !user?.phoneNumbers?.length) {
            if (userFromdb?.role === 'ADMIN') return 1
            return 0; // Phone number step
        } else if (!userFromdb?.dni) {
            return 1; // Second step
        } else if (!userFromdb?.cbu) {
            return 2; // Third step
        } else if (!userFromdb?.cuit) {
            return 3; // Fourth step
        } else if (!userFromdb?.cityId || !userFromdb?.address) {
            return 4; // Fifth step
        } else if (userFromdb?.categories?.length === 0) {
            return 5; // Fifth step
        } else {

            return 6;
            // All steps completed
        }
    };


    useEffect(() => {
        // Check if the step is in local storage

        if (local.step) {
            setCurrentStep(local.step)
            return
        }
        if (!prismaUser.isLoading) {
            // If the user data is not loaded or there's no user, reset the step
            if (!prismaUser.data || !user) {
                setCurrentStep(0);
                return;
            }

            // If the user data is loaded, determine the initial step from the user data
            const initialStep = determineInitialStep(user, prismaUser.data);
            setCurrentStep(initialStep);
        }

        return () => {
            setCurrentStep(0)
        }


    }, [local.step, user, prismaUser.data, prismaUser.isLoading])

    const { mutate } = api.user.update.useMutation()


    const handleStepSubmission = (step: number, values: any) => {
        setIsLoading(true); // Set isLoading to true when the submission starts

        return new Promise((resolve, reject) => {
            switch (step) {
                case 0:
                    // Handle the submission for the first step
                    break;
                case 1:
                    // Handle the submission for the second step
                    break;
                case 2:
                    // Handle the submission for the third step
                    break;
                case 3:
                    mutate({
                        userId: user?.id as string,
                        cuit: values.cuit,
                    }, {
                        onSuccess: () => {
                            const local = localRegisterSolucionador.get();
                            const newLocal: RegisterSolucionadorFormValues = {
                                ...local,
                                cuit: values.cuit,
                                step: 4,
                            };
                            localRegisterSolucionador.set(newLocal);
                            resolve('Success');
                        },
                        onError: (error) => {
                            reject(error);
                        }
                    });
                    break;
                // Add more cases as needed...
                default:
                    reject(new Error('Invalid step'));
            }
        })
            .finally(() => {
                setIsLoading(false); // Set isLoading to false when the submission ends
            });
    };
    return (
        <FormStepsContext.Provider value={{ currentStep, setCurrentStep, formValues, setFormValues, isLoading, handleStepSubmission }}>
            {children}
        </FormStepsContext.Provider>
    );
};