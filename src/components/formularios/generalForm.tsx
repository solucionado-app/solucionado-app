/* eslint-disable */

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

import { Textarea } from "../ui/textarea"
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "../ui/popover"
import { format, set } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "~/lib/utils"
import { Calendar } from "../ui/calendar"

import es from 'date-fns/locale/es';
import { useRouter } from "next/router"
import { api } from "~/utils/api"
import { useFormSteps } from "./ContextForm"
import ProvinceAndCityOptions from "./ProvinceAndCityOptions"
import { ServiceRequest, FormValues, localStorageRequests } from "~/lib/localStorage"
import { randomUUID } from "crypto"
import { map } from "@trpc/server/observable"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const locale = es;

const getDynamicProvices = () => dynamic(() => import("./ProvinceAndCityOptions"), {
    ssr: false,
    loading: () => <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>,
})

const formSchema = z.object({
    address: z
        .string({ required_error: "La direccion es requerida" }).min(10, { message: "Debe tener por lo menos 10 caracteres" }),
    description: z
        .string({ required_error: "el description es requerido" })
        .min(10, { message: "Debe tener al menos 10 caracteres." })
        .max(160, {
            message: "Debe tener maximo 130 caracteres.",
        }),
    date: z.date({
        required_error: "La fecha estimada es requerida.",
    }),
    province: z.object({
        id: z.string(),
        nombre: z.string(),
    }),
    city: z.object({
        id: z.string(),
        nombre: z.string(),

    }),

});



export default function GeneralForm() {
    const router = useRouter()
    const slug = router.query.slug as string;
    const { formValues } = useFormSteps();
    const { currentStep, setCurrentStep } = useFormSteps();
    const local: FormValues = localStorageRequests.get()





    const hasCategoryInLocal = slug in local && Object.prototype.hasOwnProperty.call(local, slug);


    const DinamicProvinces = getDynamicProvices()
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: hasCategoryInLocal ? local[`${slug}`]?.address : "",
            description: hasCategoryInLocal ? local[`${slug}`]?.description : "",
            date: new Date(),
            province: hasCategoryInLocal ? local[`${slug}`]?.province : undefined,
            city: hasCategoryInLocal ? local[`${slug}`]?.city : undefined,
        }
    })


    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };


    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        if (!!slug) {

            localStorageRequests.set({ ...localStorageRequests.get(), [slug]: { ...local[`${slug}`], ...values, currentStep: currentStep + 1 } })
            handleNextStep()
        }

        // console.log('id actual:', formValues)
        // if (!formValues.id) {
        //     const uid = self.crypto.randomUUID()
        //     formValues.id = uid
        //     const slug = router.query.slug
        //     setFormValues({ ...formValues, ...values })
        //     if (category && slug in localStorageRequests.get()) {

        //         localStorageRequests.set({ ...localStorageRequests.get(), [slug]: { ...values } })


        //     }
        //     else {
        //         localStorageRequests.set(prev => prev.map(item => {
        //             if (item.id === formValues.id) {
        //                 return { ...item, ...values }
        //             }
        //             return item
        //         }
        //         ))
        //         setFormValues({ ...formValues, ...values })
        //     }
        //     console.log(localStorageRequests.get())
        //     handleNextStep()


        // }
    }
    // ...

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    <DinamicProvinces formSetValue={form.setValue} formGetValues={form.getValues} formControl={form.control} />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Direccion para el servicio</FormLabel>
                                <FormControl>
                                    <Input placeholder="Dirección" {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descripcion de el problema a solucionar</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Escriba un description aquí..."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Fecha Estimada</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field?.value, "PPP", { locale })
                                                ) : (
                                                    <span>Elija una fecha</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            locale={es}
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={{ before: new Date() }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Continuar</Button>
                </form>

            </Form>


        </>
    )
}