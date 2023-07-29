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
import ProvinceAndCityOptions from "../formularios/ProvinceAndCityOptions"



const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const formSchema = z.object({
    phone: z.string({ required_error: "Debes introducir un numero de telefono" }).min(1, { message: "El telefono es requerido" }).regex(phoneRegex, 'Invalid Number!'),
    dni: z.string().min(1, { message: "El dni es requerido" }),
    address: z.string().min(1, { message: "La direccion es requerida" }),
    province: z.object({
        id: z.string(),
        nombre: z.string(),
    }),
    city: z.object({
        id: z.string(),
        nombre: z.string(),
    }),
});
export function RegisterUser() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })



    const { user, isSignedIn } = useUser()
    if (!isSignedIn) return null
    const { id } = user
    const { mutate } = api.user.update.useMutation()
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        mutate({
            userId: id,
            phone: values.phone,
            dni: values.dni,
            address: values.address,
        })
        console.log("values", values)
    }
    // ...

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                {/* <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Provincia</FormLabel>
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
                                    isLoading={queryprovinces.isLoading}
                                    placeholder='Ingresa la provincias' options={queryprovinces.data?.provincias as Province[]}
                                    getOptionLabel={(option: Province) => option?.nombre}
                                    getOptionValue={(option: Province) => option?.id}
                                    onChange={(option) => {

                                        console.log("option", option)
                                        option && form.setValue("province", { id: option.id, nombre: option.nombre })
                                        form.setValue("city", { id: "", nombre: "" })
                                        querycitys.refetch()
                                    }}
                                />
                            </FormControl>
                            <FormDescription>

                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
                <ProvinceAndCityOptions formControl={form.control} formSetValue={form.setValue} formGetValues={form.getValues} />
                {/* <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ciudad</FormLabel>
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
                                    isLoading={querycitys.isLoading || querycitys.isFetching}
                                    placeholder='Ingresa la ciudad' options={querycitys.data?.municipios as City[]}
                                    getOptionLabel={(option: City) => option?.nombre}
                                    getOptionValue={(option: City) => option?.id}
                                />
                            </FormControl>
                            <FormDescription>

                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}

                <Button type="submit">Registrarse</Button>
            </form>
        </Form>
    )
}