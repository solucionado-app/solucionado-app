/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
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
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/router"

import { useState } from "react"
import DialogAuthConfirmation from "../auth/DialogAuthConfirmation"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Textarea } from "../ui/textarea"
import { useFormSteps } from "./ContextForm"
import { type FormValues, localStorageRequests } from "~/lib/localStorage"
import Submitbutton from "../auth/FormSolucionador/Submitbutton"

const formSchema = z.object({
    herramientas: z.enum(["Si", "No"], {
        required_error: "Debe elegir una opcion",
    }),
    ancho: z.coerce.number().min(1, {
        message: "El ancho es requerido"
    }
    ),
    largo: z.coerce.number().min(1, {
        message: "El largo es requerido"
    }
    ),
    alto: z.coerce.number().min(1, {
        message: "El alto es requerido"
    }
    ),

    detalles: z.string().min(10, {
        message: "Debe tener al menos 10 caracteres.",
    }).max(160, {
        message: "Debe tener maximo 130 caracteres.",
    }),
});
export default function JardinerosForm() {
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
            herramientas: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.herramientas ?
                local[`${slug}`]?.details?.herramientas : undefined,
            ancho: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.ancho ?
                local[`${slug}`]?.details?.ancho as number : undefined,
            largo: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.largo ?
                local[`${slug}`]?.details?.largo as number : undefined,
            alto: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.alto ?
                local[`${slug}`]?.details?.alto as number : undefined,
            detalles: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.detalles ?
                local[`${slug}`]?.details?.detalles : undefined,

        },
    });

    const [open, setOpen] = useState(false)

    const { handleSubmition, isSubmitting } = useFormSteps();

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
                        name="herramientas"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>¿Tiene herramientas de jardinería?</FormLabel>
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
                    <div className="flex space-x-5 ">
                        <FormField
                            control={form.control}
                            name="ancho"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ancho(metros)</FormLabel>
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
                            name="largo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Largo(metros)</FormLabel>
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
                            name="alto"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Alto(metros)</FormLabel>
                                    <FormControl >
                                        <Input type="number" placeholder="" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="detalles"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>¿Que detalle requiere?</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Escriba los detalles aquí..."
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
                    <div className="w-[465px] text-sm bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
                        role="alert">
                        <p className="font-bold">Nota:</p>
                        <p>Los presupuestos son en base a lo mencionado en estos comentarios, cualquier cambio que el cliente quiera hacer, deberá volver a pedir un presupuesto. ya que el cambio realizado puede cambiar el costo de los trabajos.</p>
                    </div>
                    <Submitbutton isLoading={isSubmitting} text="Cotizar" />
                </form>
            </Form>

            <DialogAuthConfirmation open={open} setOpen={setOpen} />
        </>
    )
}