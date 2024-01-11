/* eslint-disable */

import { useUser } from "@clerk/nextjs";
import { User } from "@prisma/client";

import { useRouter } from "next/router";
import React, { createContext, useContext, useState } from "react";
import { type UserSolucionador, localStorageRequests } from "~/lib/localStorage";
import { api } from "~/utils/api";
import { trpc } from "~/utils/trpc";

interface FormStepsContextType {
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    formValues: Record<string, any>;
    setFormValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    handleSubmition: (local: UserSolucionador) => void;
}



const FormStepsContext = createContext<FormStepsContextType>({
    currentStep: 0,
    setCurrentStep: () => { },
    formValues: {},
    setFormValues: () => { },
    handleSubmition: () => { },
});

export const useFormSteps = () => useContext(FormStepsContext);

interface Props {
    children: React.ReactNode;

}

export const FormStepsProvider = ({ children }: Props) => {
    const { user } = useUser()

    const [currentStep, setCurrentStep] = useState(user?.hasVerifiedPhoneNumber ? 0 : 1);
    const router = useRouter()
    const [formValues, setFormValues] = useState<Record<string, any>>({});




    const userMutation = api.user.update.useMutation({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSuccess: (data) => {
            console.log(data)
        },
    })
    const utils = trpc.useContext()
    const notification = api.notification.create.useMutation()




    const handleSubmition = (local: UserSolucionador) => {

        userMutation.mutate({
            ...local,
            userId: local.id,
            phone: local.phone || undefined,
            dni: local.dni || undefined,
            address: local.address || undefined,
            cuit: local.cuit || undefined,
            cbu: local.cbu || undefined,
            categories: local.categories || undefined,
            role: local.role || undefined,
        }, {
            onSuccess: () => {
                console.log('success')
                void router.push("/solicitudes-de-servicio")
                const slug = router.query.slug as string
                localStorageRequests.set({
                    ...localStorageRequests.get(), [slug]: {}
                })
            }
        })

    }

    return (
        <FormStepsContext.Provider value={{ currentStep, setCurrentStep, formValues, setFormValues, handleSubmition }}>
            {children}
        </FormStepsContext.Provider>
    );
};