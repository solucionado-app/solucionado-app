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
import { Input } from "../ui/input";
import Submitbutton from "../auth/FormSolucionador/Submitbutton";

const formSchema = z.object({
    partida: z
        .string().min(2, {
            message: "Deben ir al menos 2 caracteres.",
        }),
    destino: z
        .string().min(2, {
            message: "Deben ir al menos 2 caracteres.",
        }),
    detalleObjeto: z.string().min(10, {
        message: "Debe tener al menos 10 caracteres.",
    }).max(160, {
        message: "Debe tener maximo 130 caracteres.",
    }),
    embalaje: z.enum(["Si", "No"], {
        required_error: "Debe elegir una opcion",
    }),

    detalleDeCompra: z.string(),

    cotizacion: z.enum(["Distancia", "Trabajo Realizado", "Que el solucionador haga la cotizacion"], {
        required_error: "Debe elegir una opcion",
    }),
});
export default function EnviosVariosForm() {
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
            partida: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.partida ?
                local[`${slug}`]?.details?.partida : undefined,
            destino: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.destino ?
                local[`${slug}`]?.details?.destino : undefined,
            detalleObjeto: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.detalleObjeto ?
                local[`${slug}`]?.details?.detalleObjeto : undefined,
            embalaje: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.embalaje ?
                local[`${slug}`]?.details?.embalaje : undefined,
            detalleDeCompra: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.detalleDeCompra ?
                local[`${slug}`]?.details?.detalleDeCompra : "",
            cotizacion: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.cotizacion ?
                local[`${slug}`]?.details?.cotizacion : undefined,
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
                        name="partida"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Partida del envio</FormLabel>
                                <FormControl>
                                    <Input placeholder="Partida" {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="destino"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Destino del envio</FormLabel>
                                <FormControl>
                                    <Input placeholder="Destino" {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="detalleObjeto"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>¿Que desea transportar? definir cantidad, detalle de producto, tamaño, etc.</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Escriba los detalles aquí..."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="embalaje"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>¿Requiere embalaje?</FormLabel>
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
                        name="detalleDeCompra"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>¿Desea que el solucionador compre algo para llevárselo? detallar qué y en donde.</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Escriba los detalles aquí..."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription className="text-xs bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2">


                                    <p className="font-bold">Nota:</p>
                                    <p>El solucionador debe pedir si o si la factura, la cual ante algún inconveniente con el cliente este puede mostrar. Caso contrario, no se tomará como válido el reclamo.</p>

                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cotizacion"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>¿Cómo quiere pagarlo? ¿por distancia o por trabajo realizado? </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Distancia" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Distancia
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Trabajo Realizado" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Trabajo Realizado
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Que el solucionador haga la cotizacion" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Que el solucionador haga la cotización
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

                    <div className="text-sm bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
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