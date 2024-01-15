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
import { api } from "~/utils/api"
import { useUser } from "@clerk/nextjs"
import { type RegisterSolucionadorFormValues, localRegisterSolucionador } from "@/src/lib/localStorage"
import { useFormSteps } from "./ContextSolucionadorForm"



const formSchema = z.object({
    cbu: z.string().min(1, { message: "El cbu es requerido" }),
});


export default function SecondStep() {
    const { user, isSignedIn } = useUser()
    const local: RegisterSolucionadorFormValues = localRegisterSolucionador.get()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cbu: local?.cbu ? local.cbu : "",
        }
    })

    const { currentStep, setCurrentStep } = useFormSteps();
    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };
    const { mutate } = api.user.update.useMutation()
    // 1. Define your form.

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        if (!isSignedIn) return null
        const { id } = user
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        mutate({
            userId: id,
            cbu: values.cbu,
        }, {
            onSuccess: () => {
                const local = localRegisterSolucionador.get()
                const newLocal: RegisterSolucionadorFormValues = {
                    ...local,
                    cbu: values.cbu,
                    step: 3,
                }
                localRegisterSolucionador.set(newLocal)
                handleNextStep()
            },
            onError: (error) => {
                if (error.shape?.code === -32603) {
                    form.setError('cbu', {
                        type: 'manual',
                        message: 'El cbu ya esta registrado'
                    })
                    return
                }
                form.setError('cbu', {
                    type: 'manual',
                    message: error.message
                })
            }

        })
        // console.log(values)
    }
    // ...

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">


                <FormField
                    control={form.control}
                    name="cbu"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>CBU</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>
                                Necesitamos tu CBU para poder pagarte
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Siguiente</Button>
            </form>
        </Form>
    )
}