/* eslint-disable */

import { useRouter } from "next/router";
import React, { createContext, useContext, useState } from "react";
import { api } from "~/utils/api";
import { trpc } from "~/utils/trpc";

interface FormStepsContextType {
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    formValues: Record<string, any>;
    setFormValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    handleSubmition: (values: Record<string, any>, userId: string) => void;
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
    categorieName?: string;
    children: React.ReactNode;
}

export const FormStepsProvider = ({ children, categorieName }: Props) => {
    const [currentStep, setCurrentStep] = useState(0);
    const router = useRouter()
    const [formValues, setFormValues] = useState<Record<string, any>>({});
    const requestMutation = api.serviceRequest.create.useMutation({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSuccess: (data) => {
            if (data?.id) {
                notification.mutate({
                    categorySlug: router.query?.slug as string,
                    title: "Nueva solicitud de servicio",
                    content: `Se ha creado una nueva solicitud de servicio para ${categorieName}`,
                    link: `/solicitudes-de-servicio/${data.id}`,
                    serviceRequestId: data.id,
                })
            }
        },
    })
    const utils = trpc.useContext()
    const notification = api.notification.create.useMutation()
    const handleSubmition = (values: Record<string, any>, userId: string) => {
        const { city, province, ...rest } = formValues
        requestMutation.mutate({
            userId: userId,
            ...rest,
            city: city.nombre,
            province: province.nombre,
            details: values,
            categorySlug: router.query?.slug as string,
        }, {
            onSuccess: () => {
                void utils.serviceRequest.getAll.invalidate()
                void utils.notification.getAll.invalidate()
                void utils.notification.countUnRead.invalidate()
                void router.push("/solicitudes-de-servicio")
            }
        })

    }

    return (
        <FormStepsContext.Provider value={{ currentStep, setCurrentStep, formValues, setFormValues, handleSubmition }}>
            {children}
        </FormStepsContext.Provider>
    );
};