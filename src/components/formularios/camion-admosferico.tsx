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
import { useRouter } from "next/router"
import { useUser } from "@clerk/nextjs"
import { useFormSteps } from "./ContextForm"
import { type FormValues, localStorageRequests } from "~/lib/localStorage"
import { useState } from "react"
import DialogAuthConfirmation from "../auth/DialogAuthConfirmation"
import Submitbutton from "../auth/FormSolucionador/Submitbutton"


const formSchema = z.object({
    cantidadDePozos: z.coerce.number(({ required_error: "Debes introducir un numero de pozos", }))
});


export function CamionAdmosfericoForm() {

    const router = useRouter()
    const { isSignedIn } = useUser()
    const { handleSubmition, isSubmitting } = useFormSteps()
    const slug = router.query.slug as string
    const local: FormValues = localStorageRequests.get()
    const hasCategoryInLocal = slug in local && Object.prototype.hasOwnProperty.call(local, slug) && JSON.stringify(local[`${slug}`]) !== '{}' && local[`${slug}`]?.details;
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cantidadDePozos: hasCategoryInLocal && local[`${slug}`]?.details?.cantidadDePozos
                ? local[`${slug}`]?.details?.cantidadDePozos as number
                : undefined,
        }

    })

    const [open, setOpen] = useState(false)

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        if (!isSignedIn) {
            localStorageRequests.set({
                ...localStorageRequests.get(), [slug]: {
                    ...local[`${slug}`],
                    details: { ...values },
                }
            })
            setOpen(true)
            return
        }
        else {
            handleSubmition(local[`${slug}`])
        }
    }
    // ...

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="cantidadDePozos"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>¿Cuántos pozos ciegos desea destapar?</FormLabel>
                            <FormControl >
                                <Input type="number" placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <Submitbutton isLoading={isSubmitting} text="Cotizar" />
                <DialogAuthConfirmation open={open} setOpen={setOpen} />

            </form>
        </Form>
    )
}