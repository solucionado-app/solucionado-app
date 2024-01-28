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
import Submitbutton from "./Submitbutton"



const formSchema = z.object({
    dni: z.string().min(1, { message: "El dni es requerido" }),
});


export default function SecondStep() {
    const { user, isSignedIn } = useUser()
    const local: RegisterSolucionadorFormValues = localRegisterSolucionador.get()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            dni: local?.dni ? local.dni : "",
        }
    })

    const { currentStep, setCurrentStep } = useFormSteps();
    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };
    const { mutate, isLoading } = api.user.update.useMutation()
    // 1. Define your form.

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        if (!isSignedIn) return null
        const { id } = user
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        mutate({
            userId: id,
            dni: values.dni,
        }, {
            onSuccess: () => {
                const newLocal: RegisterSolucionadorFormValues = {
                    ...local,
                    dni: values.dni,
                    step: 2,
                }
                localRegisterSolucionador.set(newLocal)
                handleNextStep()
            },
            onError: (error) => {
                if (error.shape?.code === -32603) {
                    form.setError('dni', {
                        type: 'manual',
                        message: 'El dni ya esta registrado'
                    })
                    return
                }
                form.setError('dni', {
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">

                <FormField
                    control={form.control}
                    name="dni"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dni</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* <FormField
                    control={form.control}
                    name="cuit"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>CUIT - CUIL</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                /> */}

                <Submitbutton isLoading={isLoading} />
            </form>
        </Form>
    )
}