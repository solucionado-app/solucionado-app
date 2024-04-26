/* eslint-disable */
import { EmailRequestData } from "@/app/api/mail/serviceRequest/route";
import { fileDataI } from "@/app/api/uploadImage/route";
import { useUser } from "@clerk/nextjs";

import { useRouter } from "next/router";
import React, { createContext, useContext, useState } from "react";
import { boolean } from "zod";
import { ServiceRequest, localStorageRequests } from "~/lib/localStorage";
import { api } from "~/utils/api";
import { trpc } from "~/utils/trpc";

interface FormStepsContextType {
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    formValues: Record<string, any>;
    setFormValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    isSubmitting: boolean,
    handleSubmition: (local: ServiceRequest | undefined) => void;
}

const FormStepsContext = createContext<FormStepsContextType>({
    currentStep: 0,
    setCurrentStep: () => { },
    formValues: {},
    setFormValues: () => { },
    handleSubmition: () => { },
    isSubmitting: false,
});

export const useFormSteps = () => useContext(FormStepsContext);

interface Props {
    children: React.ReactNode;

}

const uploadImage = async ({ photos, portrait, serviceRequestId }: {
    photos: File[],
    portrait: File | null,
    serviceRequestId: string
}) => {
    try {
        const formData = new FormData()
        if (photos.length > 0) photos.map((photo) => {
            formData.append("photos", photo)
        })
        if (!!portrait) formData.append("portrait", portrait as File)
        formData.append("serviceRequestId", serviceRequestId)
        const response = await fetch('/api/uploadImage', {
            method: 'POST',
            body: formData,
        });

        const responseData = await response.json();
        console.log(responseData);
        return responseData.url; // Return the URL of the uploaded image
    }
    catch (error) {
        console.log(error)
        if (error instanceof Error) {
            console.error('An error occurred while uploading the image:', error);
            return error.message; // Return the error message
        }

        // If the error is not an instance of Error, return a generic error message
        return 'An error occurred while uploading the image.'; // Return the error message
    }
}

export const FormStepsProvider = ({ children }: Props) => {
    const [currentStep, setCurrentStep] = useState(0);
    const router = useRouter()
    const [formValues, setFormValues] = useState<Record<string, any>>({});

    const [isSubmitting, setIsSubmitting] = useState(false);



    const requestMutation = api.serviceRequest.create.useMutation()
    const citymutation = api.city.findOrcreate.useMutation()
    const provincemutation = api.province.findOrcreate.useMutation()
    const { user } = useUser()
    const utils = trpc.useUtils()
    const handleSubmition = (local: ServiceRequest | undefined) => {
        const date = new Date(local?.date as Date)
        setIsSubmitting(true); // Set isSubmitting to true when the submission starts

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
                        if (!local) {
                            throw new Error('Local is not defined.');
                        }
                        requestMutation.mutate({
                            ...local,
                            emailaddress: user?.primaryEmailAddressId || "",
                            date: date,
                            cityName: citydata?.name,
                            cityId: citydata?.id,
                            provinceId: provincedata.id,
                            details: local?.details,
                            categorySlug: router.query?.slug as string,
                        }, {
                            onSuccess: async (data) => {
                                try {
                                    if (local?.portrait instanceof File && Array.isArray(local?.photos) && local?.photos.length > 0) {
                                        await uploadImage({
                                            portrait: local.portrait,
                                            photos: local.photos,
                                            serviceRequestId: data?.id as string,
                                        });
                                    } else if (local?.portrait instanceof File) {
                                        await uploadImage({
                                            portrait: local.portrait,
                                            photos: [],
                                            serviceRequestId: data?.id as string,
                                        });
                                    } else if (Array.isArray(local?.photos) && local?.photos.length > 0) {
                                        await uploadImage({
                                            portrait: null,
                                            photos: local.photos,
                                            serviceRequestId: data?.id as string,
                                        });
                                    }
                                } catch (error) {
                                    console.log(error);
                                }

                                const slug = router.query.slug as string
                                localStorageRequests.set({
                                    ...localStorageRequests.get(), [slug]: {}
                                })
                                setIsSubmitting(false);
                                void utils.serviceRequest.getAll.invalidate()
                                await router.push(`/solicitudes-de-servicio/${data?.id}?newserviceRequestId=${data?.id}`)
                                // Set isSubmitting to false when the submission finishes
                            }
                        })
                    }
                })
            }
        })



    }

    return (
        <FormStepsContext.Provider value={{ currentStep, setCurrentStep, formValues, setFormValues, handleSubmition, isSubmitting }}>
            {children}
        </FormStepsContext.Provider>
    );
};