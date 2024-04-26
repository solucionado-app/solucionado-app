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

import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/router"

import { useState } from "react"
import DialogAuthConfirmation from "../auth/DialogAuthConfirmation"
import { useFormSteps } from "./ContextForm"
import { type FormValues, localStorageRequests } from "~/lib/localStorage"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import Submitbutton from "../auth/FormSolucionador/Submitbutton";


const formSchema = z.object({
    tipo: z.enum(["Caldera", "Termotanque", "Calefactor", "Cocina"], {
        required_error: "Debe elegir una opcion",
    }),
    marca: z.string().optional(),
    modelo: z.string().optional(),
    codigoError: z.string().optional(),
    funcionaParcialmente: z.enum(["Si", "No"]).optional(),
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
            tipo: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.tipo ?
                local[`${slug}`]?.details?.tipo : undefined,
            marca: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.marca ?
                local[`${slug}`]?.details?.marca : undefined,
            modelo: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.modelo ?
                local[`${slug}`]?.details?.modelo : undefined,
            codigoError: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.codigoError ?
                local[`${slug}`]?.details?.codigoError : undefined,
            funcionaParcialmente: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.funcionaParcialmente ?
                local[`${slug}`]?.details?.funcionaParcialmente : undefined,
            /* image: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.image ?
                local[`${slug}`]?.details?.image : null, */
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
                        name="tipo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona el tipo de problema por favor" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Caldera">Caldera</SelectItem>
                                        <SelectItem value="Termotanque">Termotanque</SelectItem>
                                        <SelectItem value="Calefactor">Calefactor</SelectItem>
                                        <SelectItem value="Cocina">Cocina</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Por favor describa el tipo de servicio que desea
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="marca"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Marca</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>

                                <FormDescription>

                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {form.watch("tipo") === ("Caldera" || "Termotanque") && (
                        <FormField
                            control={form.control}
                            name="modelo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Modelo</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>

                                    <FormDescription>

                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )
                        || form.watch("tipo") === "Termotanque" && (
                            <FormField
                                control={form.control}
                                name="codigoError"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Codigo de error</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>

                                        <FormDescription>

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )
                        || form.watch("tipo") === "Cocina" && (<FormField
                            control={form.control}
                            name="funcionaParcialmente"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Funciona parcialmente?</FormLabel>
                                    <FormControl>
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
                                    </FormControl>

                                    <FormDescription>

                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />)}


                    <Submitbutton isLoading={isSubmitting} text="Cotizar" />
                </form>
            </Form>

            <DialogAuthConfirmation open={open} setOpen={setOpen} />
        </>
    )
}