/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Select from 'react-select'

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
import { api } from "~/utils/api"
import { useUser } from "@clerk/nextjs"
import { type RegisterSolucionadorFormValues, localRegisterSolucionador } from "@/src/lib/localStorage"
import { useFormSteps } from "./ContextSolucionadorForm"
import { useRouter } from "next/navigation"



const formSchema = z.object({

    categories: z.array(z.object({
        id: z.number(),
        name: z.string(),
        slug: z.string(),
    })).min(1, { message: "La categoria es requerida" }),
});


export default function SecondStep() {
    const { user, isSignedIn } = useUser()
    const local: RegisterSolucionadorFormValues = localRegisterSolucionador.get()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categories: local.categories ? local.categories : [],
        }
    })

    const { currentStep, setCurrentStep } = useFormSteps();

    const router = useRouter()
    const { mutate } = api.user.update.useMutation()
    // 1. Define your form.
    const { data: categories, isLoading } = api.categories.getAll.useQuery();

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        if (!isSignedIn) return null
        const { id } = user
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        console.log(values)
        mutate({
            userId: id,
            categories: values.categories,
        }, {
            onSuccess: () => {

                const newLocal: RegisterSolucionadorFormValues = {
                    ...local,
                    categories: values.categories,
                }
                localRegisterSolucionador.set(newLocal)
                router.push('/perfil')
            },
            onError: (error) => {
                if (error.shape?.code === -32603) {
                    form.setError('categories', {
                        type: 'manual',
                        message: 'El categories ya esta registrado'
                    })
                    return
                }
                form.setError('categories', {
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">

                <FormField
                    control={form.control}
                    name="categories"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categorias</FormLabel>
                            <FormControl>
                                <Select
                                    {...field}
                                    styles={{
                                        control: (styles) => ({
                                            ...styles,
                                            backgroundColor: 'white',
                                        }),
                                        menuList: (provided) => ({
                                            ...provided,
                                            backgroundColor: 'white',
                                        }),
                                    }}
                                    isLoading={isLoading}
                                    isMulti placeholder='Elige las categorias' options={categories}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id.toString()}
                                />
                            </FormControl>
                            <FormDescription>
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