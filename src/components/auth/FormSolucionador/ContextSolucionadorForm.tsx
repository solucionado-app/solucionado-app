/* eslint-disable */

import { useUser } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { type UserResource } from "@clerk/nextjs/node_modules/@clerk/types/dist/user";
import React, { createContext, useContext, useEffect, useState } from "react";
import { type UserSolucionador, localStorageRequests, localRegisterSolucionador, RegisterSolucionadorFormValues } from "~/lib/localStorage";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";

interface FormStepsContextType {
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    formValues: Record<string, any>;
    setFormValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;

}




const FormStepsContext = createContext<FormStepsContextType>({
    currentStep: 0,
    setCurrentStep: () => { },
    formValues: {},
    setFormValues: () => { },
});

export const useFormSteps = () => useContext(FormStepsContext);

interface Props {
    children: React.ReactNode;

}

export const FormStepsProvider = ({ children }: Props) => {
    const { user } = useUser()
    const local: RegisterSolucionadorFormValues = localRegisterSolucionador.get()
    console.log(local)

    const [currentStep, setCurrentStep] = useState(0);
    const [formValues, setFormValues] = useState<Record<string, any>>({});
    const prismaUser = api.user.getById.useQuery(undefined, {
        enabled: !!user?.id
    })

    type userDb = typeof prismaUser.data

    const router = useRouter()
    const determineInitialStep = (user: UserResource, userFromdb: userDb) => {

        if (!user.hasVerifiedPhoneNumber || !user?.phoneNumbers?.length) {
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



        if (!prismaUser.isLoading && !prismaUser.data) return
        if (!user) return
        const initialStep = determineInitialStep(user, prismaUser.data)
        setCurrentStep(initialStep)
        // if (local.step) {
        //     setCurrentStep(local.step)
        // }
        return () => {
            setCurrentStep(0)
        }

    }, [local.step, user, prismaUser.data, prismaUser.isLoading])
    const userMutation = api.user.update.useMutation({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSuccess: (data) => {
            console.log(data)
        },
    })





    // const handleSubmition = (local: UserSolucionador) => {

    //     userMutation.mutate({
    //         ...local,
    //         userId: local.id,
    //         phone: local.phone || undefined,
    //         dni: local.dni || undefined,
    //         address: local.address || undefined,
    //         cuit: local.cuit || undefined,
    //         cbu: local.cbu || undefined,
    //         categories: local.categories || undefined,
    //         role: local.role || undefined,
    //     }, {
    //         onSuccess: () => {
    //             console.log('success')
    //             void router.push("/solicitudes-de-servicio")
    //             const slug = router.query.slug as string
    //             localStorageRequests.set({
    //                 ...localStorageRequests.get(), [slug]: {}
    //             })
    //         }
    //     })

    // }

    return (
        <FormStepsContext.Provider value={{ currentStep, setCurrentStep, formValues, setFormValues }}>
            {children}
        </FormStepsContext.Provider>
    );
};