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
import { Label } from "../ui/label";


const formSchema = z.object({
    queDeseaFumigar: z
        .string().min(2, {
            message: "Deben ir al menos 2 caracteres.",
        }),
    /* cantidadDePrendas: z
    .coerce.number().min(1, {
        message: "Deben ir al menos 1 caracter mayor o igual a 1.",
    }), */
    donde: z.enum(["interior", "exterior"], {
        required_error: "Debe elegir una opcion",
    }),
    mascotas: z.enum(["Si", "No"], {
        required_error: "Debe elegir una opcion",
    }),

    detallesDeCotizacion: z.string(),

    // image: z.instanceof(File),
});
export default function FumigadoresForm() {
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
            donde: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.donde ?
                local[`${slug}`]?.details?.donde : undefined,
            mascotas: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.mascotas ?
                local[`${slug}`]?.details?.mascotas : undefined,
            detallesDeCotizacion: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.detallesDeCotizacion ?
                local[`${slug}`]?.details?.detallesDeCotizacion : " ",
            /* image: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.image ?
                local[`${slug}`]?.details?.image : null, */
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
                        name="queDeseaFumigar"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>¿Que desea Fumigar?</FormLabel>
                                <FormControl>
                                    <Input placeholder="Descripcion" {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture">Picture</Label>
                        <Input id="picture" type="file" />
                    </div>

                    <FormField
                        control={form.control}
                        name="donde"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>¿es en el interior o exterior de la casa?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="interior" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Interior
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="exterior" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Exterior
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
                        name="mascotas"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>¿es en el interior o exterior de la casa?</FormLabel>
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
                        name="detallesDeCotizacion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>¿Cómo desea que establezcan el presupuesto? horas de trabajo o trabajo realizado?</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Escriba los detalles aquí..."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription className="text-xs bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2">


                                    <p className="font-bold">Nota:</p>
                                    <p>el presupuesto incluye el costo de los elementos de trabajo y los productos químicos. (dar opción al solucionador/fumigador cuando responda de poder cobrarlo a parte).</p>

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