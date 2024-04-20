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
    detallesEmbalaje: z.string().min(10, {
        message: "Debe tener al menos 10 caracteres.",
    }).max(160, {
        message: "Debe tener maximo 130 caracteres.",
    }),
    cantidadDeObjetos: z.coerce.number().min(1, {
        message: "La cantidad de objetos es requerido"
    }),
    elementoDeEmbalaje: z.enum(["Cajas", "Diario", "Papel film"], {
        required_error: "Debe elegir una opcion",
    }),
    elementoSeleccionado: z.enum(["Si", "No"], {
        required_error: "Debe elegir una opcion",
    }),
});
export default function EmbaladoresForm() {
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
            detallesEmbalaje: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.detallesEmbalaje ?
                local[`${slug}`]?.details?.detallesEmbalaje : undefined,
            cantidadDeObjetos: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.cantidadDeObjetos ?
                local[`${slug}`]?.details?.cantidadDeObjetos as number : undefined,
            elementoDeEmbalaje: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.elementoDeEmbalaje ?
                local[`${slug}`]?.details?.elementoDeEmbalaje : undefined,
            elementoSeleccionado: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.elementoSeleccionado ?
                local[`${slug}`]?.details?.elementoSeleccionado : undefined,

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
                        name="detallesEmbalaje"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>¿Que desea embalar? detallar.</FormLabel>
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
                    <FormField
                        control={form.control}
                        name="cantidadDeObjetos"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>¿Cuánta cantidad desea embalar? de los productos mencionados anteriormente.</FormLabel>
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
                        name="elementoDeEmbalaje"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>¿Que elemento de embalaje desea que utilicen? cajas, diario o papel film. seleccionar las que desee. </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Cajas" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Cajas
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Diario" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Diario
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Papel film" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Papel film
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
                        name="elementoSeleccionado"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>¿Cuenta con los elementos que seleccionó para embalar? caso contrario el solucionador lo cotizará por separado a su servicio de embalador. </FormLabel>
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