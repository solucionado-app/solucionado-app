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
import { type FormValues, localStorageRequests } from "~/lib/localStorage"
import { useFormSteps } from "./ContextForm"
const formSchema = z.object({
    numeroDeLamparas: z.coerce.number({ required_error: "Debes introducir un numero de lamparas", }),
});
export default function ElectricistasForm() {
    // 1. Define your form.
    const router = useRouter()
    const { user, isSignedIn } = useUser()
    const { handleSubmition } = useFormSteps()
    const slug = router.query.slug as string
    const local: FormValues = localStorageRequests.get()
    const hasCategoryInLocal = slug in local && Object.prototype.hasOwnProperty.call(local, slug);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            numeroDeLamparas: hasCategoryInLocal && local[`${slug}`]?.details && local[`${slug}`]?.details?.numeroDeMascotas ?
                local[`${slug}`]?.details?.numeroDeMascotas as number : 1,
        },
    });
    // useEffect(() => {
    //     console.log(numeroDeLamparas)
    //     if (numeroDeLamparas && typeof numeroDeLamparas === "string") {
    //         setnumeroDeLamparasNumber(parseInt(numeroDeLamparas))
    //         form.setValue("numeroDeLamparas", parseInt(numeroDeLamparas))
    //     }
    // }, [router.query, numeroDeLamparas, form])
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
                        name="numeroDeLamparas"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Numero de lamparas</FormLabel>
                                <FormControl >
                                    <Input type="number" placeholder="" {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
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