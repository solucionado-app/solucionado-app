/* eslint-disable @typescript-eslint/no-misused-promises, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

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

import {
    RadioGroup,
    RadioGroupItem
} from "../ui/radio-group"
import { useRouter } from "next/router"
import { useUser } from "@clerk/nextjs"
import { useFormSteps } from "./ContextForm"
import { type FormValues, localStorageRequests } from "~/lib/localStorage"
import DialogAuthConfirmation from "../auth/DialogAuthConfirmation"
import { useState } from "react"
import Submitbutton from "../auth/FormSolucionador/Submitbutton"

const formSchema = z.object({
    lugarDePartida: z
        .string().min(2, {
            message: "Deben ir al menos 2 caracteres.",
        }),

    ciudadDePartida: z
        .string().min(2, {
            message: "Deben ir al menos 2 caracteres.",
        }),

    lugarDeDestino: z
        .string().min(2, {
            message: "Deben ir al menos 2 caracteres.",
        }),

    ciudadDeDestino: z
        .string().min(2, {
            message: "Deben ir al menos 2 caracteres.",
        }),

    cantidadDeElementos: z
        .coerce.number({
            required_error: "Deben ir al menos 1 caracteres.",
        }),

    acomodarElementos: z.enum(["Si", "No"], {
        required_error: "Debe elegir una opcion.",
    }),

    lugarDeGuardado: z.enum(["Si", "No"], {
        required_error: "Debe elegir una opcion.",
    }),
});



export default function FletesForm() {
    // 1. Define your form.
    const router = useRouter()
    const { isSignedIn } = useUser()
    const { handleSubmition, isSubmitting } = useFormSteps()
    const slug = router.query.slug as string
    const local: FormValues = localStorageRequests.get()
    const hasCategoryInLocal = slug in local && Object.prototype.hasOwnProperty.call(local, slug) && JSON.stringify(local[`${slug}`]) !== '{}' && local[`${slug}`]?.details;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            lugarDePartida: hasCategoryInLocal && local[`${slug}`]?.details?.lugarDePartida ? local[`${slug}`]?.details?.lugarDePartida as string : "",
            acomodarElementos: hasCategoryInLocal && !!local[`${slug}`]?.details?.acomodarElementos ? local[`${slug}`]?.details?.acomodarElementos : undefined,
        }
    })
    const [open, setOpen] = useState(false)

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        localStorageRequests.set({
            ...localStorageRequests.get(), [slug]: {
                ...local[`${slug}`],
                details: { ...values },
            }
        })
        if (!isSignedIn) {
            setOpen(true)
            return
        }
        else {
            handleSubmition(local[`${slug}`])
        }
        // console.log(values)
    }
    // ...

    return (
        <>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="lugarDePartida"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Lugar de partida (Calle y altura)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Lugar" {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="ciudadDePartida"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ciudad (Partida)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ciudad" {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lugarDeDestino"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Lugar de destino (Calle y altura)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Lugar" {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="ciudadDeDestino"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ciudad (Destino)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ciudad" {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cantidadDeElementos"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cantidad de elementos a embalar</FormLabel>
                                <FormControl >
                                    <Input type="number" placeholder="" {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="acomodarElementos"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>¿Necesita que los elementos luego del traslado sean acomodados dentro del hogar, o solo ser descargados en el lugar de destino?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Si" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Si
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="No" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                No
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lugarDeGuardado"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>¿Desea que el fletero tenga lugar de guardado de los elementos?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Si" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Si
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="No" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                No
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Submitbutton isLoading={isSubmitting} text="Cotizar" />
                </form>
            </Form>
            <DialogAuthConfirmation open={open} setOpen={setOpen} />

        </>
    )
}