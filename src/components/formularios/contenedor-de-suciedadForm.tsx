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

import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/router"

import { useState } from "react"
import DialogAuthConfirmation from "../auth/DialogAuthConfirmation"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Textarea } from "../ui/textarea"
import { useFormSteps } from "./ContextForm"
import { type FormValues, localStorageRequests } from "~/lib/localStorage"

const formSchema = z.object({
    instrumentos: z.enum(["Si", "No"], {
        required_error: "Debe elegir una opcion",
    }),

    detalles: z.string(),
});
export default function ContenedorDeSuciedadForm() {
    // 1. Define your form.
    const router = useRouter()
    // const { numeroDeMascotas } = router.query
    const { isSignedIn } = useUser()
    const slug = router.query.slug as string
    const local: FormValues = localStorageRequests.get()
    const hasCategoryInLocal = slug in local && Object.prototype.hasOwnProperty.call(local, slug);

    // console.log(local[`${slug}`]?.details)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            instrumentos: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.instrumentos ?
                local[`${slug}`]?.details?.instrumentos : undefined,
            detalles: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.detalles ?
                local[`${slug}`]?.details?.detalles : " ",
        },
    });

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
            handleSubmition(local[`${slug}`])
        }
    }
    // ...
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="instrumentos"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>¿Qué es lo que desea arrojar en los mismos?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Escombros" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Escombros
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Basura" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Basura (plásticos-papeles)
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Tierra" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Tierra
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Varios" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Varios
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
                        name="detalles"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>¿Cómo le interesa que presupuesten el trabajo? en base a tiempo, espacio, etc.</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Escriba los detalles aquí..."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription className="text-xs bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2">
                                
                                    
                                    <p className="font-bold">Nota:</p>
                                    <p>Opcional, si el cliente no desea detallar esto, corre por cuenta del solucionador en base a que medida establecerá el precio de su servicio. </p>
                                
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="text-sm bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
                        role="alert">
                        <p className="font-bold">Nota:</p>
                        <p>Los presupuestos son en base a lo mencionado en estos comentarios, cualquier cambio que el cliente quiera hacer, deberá volver a pedir un presupuesto. ya que el cambio realizado puede cambiar el costo de los trabajos.</p>
                    </div>
                    <Button type="submit">Cotizar</Button>
                </form>
            </Form>

            <DialogAuthConfirmation open={open} setOpen={setOpen} />
        </>
    )
}