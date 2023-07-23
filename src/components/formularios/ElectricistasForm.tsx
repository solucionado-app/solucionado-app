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
import { api } from "~/utils/api"
import { useRouter } from "next/router"
import { trpc } from "~/utils/trpc";

import { useEffect, useState } from "react"
import DialogAuthConfirmation from "../auth/DialogAuthConfirmation"
const formSchema = z.object({
    numeroDeLamparas: z.coerce.number({ required_error: "Debes introducir un numero de lamparas", }),
});
export default function ElectricistasForm() {
    // 1. Define your form.
    const router = useRouter()
    const { numeroDeLamparas } = router.query
    const { user, isSignedIn } = useUser()

    const [numeroDeLamparasNumber, setnumeroDeLamparasNumber] = useState(1)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            numeroDeLamparas: typeof numeroDeLamparas === "string" ? parseInt(numeroDeLamparas) : 1,
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
    const [formvalues, setformvalues] = useState({})
    const utils = trpc.useContext()

    const mutation = api.serviceRequest.create.useMutation({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSuccess: (input) => {
            void utils.serviceRequest.getAll.invalidate()
        },
    })


    // 2. Define a submit handler.



    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        if (!isSignedIn) {
            setformvalues(values)
            setOpen(true)

        }
        else {
            const { id } = user
            mutation?.mutate({
                userId: id,
                details: values,
                categorySlug: router.query?.slug as string,
            })
            void router.push("/solicitudes-de-servicio")
        }
        console.log(values)
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
            {/* <Dialog open={open} onOpenChange={setOpen}>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Inicia Sesion!</DialogTitle>
                        <DialogDescription>
                            Inicia Sesion para Seguir con la cotizacion.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button onClick={() => void router.push({
                            pathname: "/login",
                            query: {
                                redirect: router.asPath,
                                ...formvalues
                            }
                        })} type="button">Continuar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog> */}
            <DialogAuthConfirmation open={open} setOpen={setOpen} formvalues={formvalues} />
        </>
    )
}