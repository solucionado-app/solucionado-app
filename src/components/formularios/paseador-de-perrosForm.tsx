/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/router"

import { useState } from "react"
import DialogAuthConfirmation from "../auth/DialogAuthConfirmation"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { useFormSteps } from "./ContextForm"
import { type FormValues, localStorageRequests } from "~/lib/localStorage"
const formSchema = z.object({
    numeroDeMascotas: z.coerce.number({ required_error: "Debes introducir un numero de mascotas", }).min(1, { message: "El numero de mascotas es requerido" }),
    tieneCorrea: z.enum(["Si", "No"]),
    tiempoDePaseo: z.enum(["30 minutos", "1 hora", "1 hora y media", "2 horas"], {
        required_error: "Debe elegir una opcion",
    }),
});
export default function ElectricistasForm() {
    // 1. Define your form.
    const router = useRouter()
    // const { numeroDeMascotas } = router.query
    const { user, isSignedIn } = useUser()
    const slug = router.query.slug as string
    const local: FormValues = localStorageRequests.get()
    const hasCategoryInLocal = slug in local && Object.prototype.hasOwnProperty.call(local, slug);

    console.log(local[`${slug}`]?.details)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            numeroDeMascotas: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.numeroDeMascotas ?
                local[`${slug}`]?.details?.numeroDeMascotas as number : 1,
            tieneCorrea: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.tieneCorrea ?
                local[`${slug}`]?.details?.tieneCorrea : undefined,
            tiempoDePaseo: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.tiempoDePaseo ?
                local[`${slug}`]?.details?.tiempoDePaseo : undefined,
        },
    });
    // useEffect(() => {
    //     console.log(numeroDeMascotas)
    //     if (numeroDeMascotas && typeof numeroDeMascotas === "string") {
    //         setnumeroDeMascotasNumber(parseInt(numeroDeMascotas))
    //         form.setValue("numeroDeMascotas", parseInt(numeroDeMascotas))
    //     }
    // }, [router.query, numeroDeMascotas, form])
    const [open, setOpen] = useState(false)
    const { handleSubmition } = useFormSteps();



    // 2. Define a submit handler.



    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // localStorageRequests.set(prev => [...prev, { details: values }])

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
            handleSubmition(values, user?.id, local[`${slug}`])
        }
    }
    // ...
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="numeroDeMascotas"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Numero de Mas cotas</FormLabel>
                                <FormControl >
                                    <Input type="number" placeholder="" {...field} />
                                </FormControl>
                                <div className="w-[465px] text-sm bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
                                    role="alert">
                                    <p className="font-bold">Nota: </p>
                                    <FormDescription>
                                        se da por entendido que todas cuentan con sus respectivas vacunas y que no son agresivas.

                                    </FormDescription>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="tieneCorrea"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>¿Tiene Correa y Collar para el mismo?</FormLabel>
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
                                <FormDescription>
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="tiempoDePaseo"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Tiempo de paseo</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="30 minutos" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                30 minutos
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="1 hora" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                1 hora
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="1 hora y media" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                1 hora y media
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="2 horas" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                2 horas
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                <FormDescription>
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Cotizar</Button>
                </form>
            </Form>

            <DialogAuthConfirmation open={open} setOpen={setOpen} />
        </>
    )
}