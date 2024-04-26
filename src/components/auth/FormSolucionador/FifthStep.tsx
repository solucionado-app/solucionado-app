/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "~/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"

import { useForm } from "react-hook-form";
import { api } from "~/utils/api"
import { useUser } from "@clerk/nextjs"
import { type RegisterSolucionadorFormValues, localRegisterSolucionador } from "@/src/lib/localStorage"
import { useFormSteps } from "./ContextSolucionadorForm"
import { add } from "date-fns"
import ProvinceAndCityOptions from "../../formularios/ProvinceAndCityOptions"
import Submitbutton from "./Submitbutton"



const formSchema = z.object({
    address: z.string().min(1, { message: "La direccion es requerida" }),
    province: z.object({
        id: z.string(),
        nombre: z.string(),
    }),
    city: z.object({
        id: z.string(),
        nombre: z.string(),
    }),
});


export default function SecondStep() {
    const { user, isSignedIn } = useUser()
    const local: RegisterSolucionadorFormValues = localRegisterSolucionador.get()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: local?.address ? local.address : "",
            province: local?.province ? local.province : {
                id: "",
                nombre: "",
            },
            city: local?.city ? local.city : {
                id: "",
                nombre: "",
            },
        }
    })

    const { currentStep, setCurrentStep } = useFormSteps();
    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };
    const { mutate, isLoading } = api.user.update.useMutation()
    const { mutate: mutateCity } = api.city.findOrcreate.useMutation()
    const { mutate: mutateProvince } = api.province.findOrcreate.useMutation()

    const provinceData = api.province.getOne.useQuery({ id: form.getValues().province.id }, {
        enabled: !!form.getValues().province.id,
    })
    // 1. Define your form.
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        if (!isSignedIn) return null
        const { id } = user
        // Do something with the form values.
        // ✅ This will be type-safe and validated.


        console.log(values)
        mutateProvince({
            id: values.province.id,
            nombre: values.province.nombre,
        }, {
            onSuccess: (data) => {
                console.log("provincia creada", data)
                mutateCity({
                    id: values.city.id,
                    nombre: values.city.nombre,
                    provinceId: values.province.id,
                }, {
                    onSuccess: (data) => {
                        console.log("ciudad creada", data)
                        mutate({
                            userId: id,
                            address: values.address,
                            provinceId: values.province.id,
                            cityId: values.city.id,
                        }, {
                            onSuccess: () => {
                                const local = localRegisterSolucionador.get()
                                const newLocal: RegisterSolucionadorFormValues = {
                                    ...local,
                                    address: values.address,
                                    province: values.province,
                                    city: values.city,
                                    step: 5,
                                }
                                localRegisterSolucionador.set(newLocal)

                                if (user.unsafeMetadata.role !== 'SOLUCIONADOR') {
                                    user.update({ unsafeMetadata: { ...user.unsafeMetadata, completedProfile: true } })
                                        .then((res) => console.log(res))
                                        .catch((error: { errors: unknown }) => console.log("An error occurred:", error?.errors));
                                }
                                handleNextStep()
                            },
                            onError: (error) => {
                                console.log(error)
                                if (error.shape?.code === -32603) {
                                    form.setError('address', {
                                        type: 'manual',
                                        message: 'El address ya esta registrado'
                                    })
                                    return
                                }
                                form.setError('address', {
                                    type: 'manual',
                                    message: error.message
                                })
                            }

                        })
                    },
                    onError: (error) => {
                        console.log(error)
                    }
                })
            },
            onError: (error) => {
                console.log(error)

            }
        })

        // mutate({
        //     userId: id,
        //     address: values.address,
        //     province: values.province.nombre,

        // }, {
        //     onSuccess: () => {
        //         const local = localRegisterSolucionador.get()
        //         const newLocal: RegisterSolucionadorFormValues = {
        //             ...local,
        //             address: values.address,
        //             province: values.province,
        //             city: values.city,
        //         }
        //         localRegisterSolucionador.set(newLocal)
        //         handleNextStep()
        //     },
        //     onError: (error) => {
        //         if (error.shape?.code === -32603) {
        //             form.setError('address', {
        //                 type: 'manual',
        //                 message: 'El address ya esta registrado'
        //             })
        //             return
        //         }
        //         form.setError('address', {
        //             type: 'manual',
        //             message: error.message
        //         })
        //     }

        // })

        // mutate({
        //     userId: id,
        //     address: values.address,
        //     province: values.province.nombre,
        //     city: values.city.nombre,
        // }, {
        //     onSuccess: () => {
        //         const local = localRegisterSolucionador.get()
        //         const newLocal: RegisterSolucionadorFormValues = {
        //             ...local,
        //             address: values.address,
        //             province: values.province,
        //             city: values.city,
        //         }
        //         localRegisterSolucionador.set(newLocal)
        //         handleNextStep()
        //     },
        //     onError: (error) => {
        //         if (error.shape?.code === -32603) {
        //             form.setError('address', {
        //                 type: 'manual',
        //                 message: 'El address ya esta registrado'
        //             })
        //             return
        //         }
        //         form.setError('address', {
        //             type: 'manual',
        //             message: error.message
        //         })
        //     }

        // })
        // console.log(values)
    }
    // ...

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Domiciolio Actual</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <ProvinceAndCityOptions formControl={form.control} formSetValue={form.setValue} formGetValues={form.getValues} />

                {/* <Button className="w-full" type="submit">Siguiente</Button> */}
                <Submitbutton isLoading={isLoading} />
            </form>
        </Form>
    )
}