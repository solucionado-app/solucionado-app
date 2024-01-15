/* eslint-disable */
import { useUser } from "@clerk/nextjs";

import { useRouter } from "next/router";
import React, { createContext, useContext, useState } from "react";
import { ServiceRequest, localStorageRequests } from "~/lib/localStorage";
import { api } from "~/utils/api";
import { trpc } from "~/utils/trpc";

interface FormStepsContextType {
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    formValues: Record<string, any>;
    setFormValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    handleSubmition: (local: ServiceRequest | undefined) => void;
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
                    content: `Se ha creado una nueva solicitud de servicio para ${data.category.name}`,
                    link: `/solicitudes-de-servicio/${data.id}`,
                    serviceRequestId: data.id,
                })
            }
        },
    })
    const citymutation = api.city.findOrcreate.useMutation()
    const provincemutation = api.province.findOrcreate.useMutation()
    const { user } = useUser()
    const utils = trpc.useContext()
    const notification = api.notification.create.useMutation()
    const handleSubmition = (local: ServiceRequest | undefined) => {
        const date = new Date(local?.date as Date)

        provincemutation.mutate({
            nombre: local?.province?.nombre as string,
            id: local?.province?.id as string,
        }, {
            onSuccess: (provincedata) => {
                citymutation.mutate({
                    nombre: local?.city?.nombre as string,
                    id: local?.city?.id as string,
                    provinceId: provincedata.id,
                }, {
                    onSuccess: (citydata) => {
                        requestMutation.mutate({
                            ...local,
                            emailaddress: user?.primaryEmailAddressId || "",
                            date: date,
                            cityId: citydata?.id,
                            provinceId: provincedata.id,
                            details: local?.details,
                            categorySlug: router.query?.slug as string,
                        }, {
                            onSuccess: () => {
                                void utils.serviceRequest.getAll.invalidate()
                                void utils.notification.getAll.invalidate()
                                void utils.notification.countUnRead.invalidate()

                                void router.push("/solicitudes-de-servicio")
                                const slug = router.query.slug as string
                                localStorageRequests.set({
                                    ...localStorageRequests.get(), [slug]: {}
                                })
                            }
                        })
                    }
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