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
import { Input } from "~/components/ui/input"

import { useForm } from "react-hook-form";
import { api } from "~/utils/api"
import { useUser } from "@clerk/nextjs"
import ProvinceAndCityOptions from "../formularios/ProvinceAndCityOptions"


const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const formSchema = z.object({
    phone: z.string({ required_error: "Debes introducir un numero de telefono" }).min(1, { message: "El telefono es requerido" }).regex(phoneRegex, 'Invalid Number!'),
    dni: z.string().min(1, { message: "El dni es requerido" }),
    address: z.string().min(1, { message: "La direccion es requerida" }),
    cuit: z.string().min(1, { message: "El cuit es requerido" }),
    province: z.object({
        id: z.string(),
        nombre: z.string(),
    }),
    city: z.object({
        id: z.string(),
        nombre: z.string(),
    }),
    categories: z.array(z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
        slug: z.string(),
    })).min(1, { message: "La categoria es requerida" }),
});
export function RegisterSolucionadorUser() {
    const { user, isSignedIn } = useUser()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })
    const { data: categories, isLoading } = api.categories.getAll.useQuery();
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
            phone: values.phone,
            dni: values.dni,
            address: values.address,
            cuit: values.cuit,
            categories: values.categories,
            role: 'SOLUCIONADOR',
        }, {
            onSuccess: () => {
                window.location.replace(`https://auth.mercadopago.com/authorization?client_id=${process.env.NEXT_PUBLIC_MP_CLIENT_ID ?? ''}&response_type=code&platform_id=mp&state=${user ? user.id : ''}&redirect_uri=${process.env.NEXT_PUBLIC_MP_DOMAIN ?? ''}/api/webhooks/mercadopago/autorization`)
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
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telofono</FormLabel>
                            <FormControl>
                                <Input placeholder="ej: 2984694512" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Domiciolio Actual</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <ProvinceAndCityOptions formControl={form.control} formSetValue={form.setValue} formGetValues={form.getValues} />
                <FormField
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

                <Button type="submit">Registrarse</Button>
            </form>
        </Form>
    )
}