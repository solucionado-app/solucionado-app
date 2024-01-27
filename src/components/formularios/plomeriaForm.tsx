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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../ui/select"
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { type FormValues, localStorageRequests } from "~/lib/localStorage";
import { useState } from "react";
import { useFormSteps } from "./ContextForm";
import DialogAuthConfirmation from "../auth/DialogAuthConfirmation";
import Submitbutton from "../auth/FormSolucionador/Submitbutton";

const formSchema = z.object({
    tipoSuperficie: z
        .string({
            required_error: "Dene elegir un a opción",
        }),
});
export default function PlomerosForm() {
    // 1. Define your form.

    const { isSignedIn } = useUser()
    const router = useRouter()
    const slug = router.query.slug as string
    const local: FormValues = localStorageRequests.get()
    const hasCategoryInLocal = slug in local && Object.prototype.hasOwnProperty.call(local, slug);
    const [open, setOpen] = useState(false)
    const { handleSubmition, isSubmitting } = useFormSteps()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tipoSuperficie: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.tipoSuperficie ?
                local[`${slug}`]?.details?.tipoSuperficie as string : undefined,
        }
    })
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        // console.log(values)
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
                    name="tipoSuperficie"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Seleccione el problema</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Seleccione un opción" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Desague cloacal">Desague cloacal</SelectItem>
                                        <SelectItem value="Inodoro">Inodoro</SelectItem>
                                        <SelectItem value="Pluviales">Pluviales</SelectItem>
                                        <SelectItem value="Lavamanos">Lavamanos</SelectItem>
                                        <SelectItem value="Filtraciones">Filtraciones</SelectItem>
                                    </SelectContent>
                                </Select>
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