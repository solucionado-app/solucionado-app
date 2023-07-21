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
import { Textarea } from "~/components/ui/textarea"
// import { Input } from "~/components/ui/input"

import { useForm } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../ui/select"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"


const formSchema = z.object({
    tipoSuperficie: z
        .string({
            required_error: "El tipo de superficie es requerido",
        }),

    tipoPared: z
        .string({
            required_error: "El tipo de pared es requerido",
        }),

    imperfecciones: z
        .string()
        .min(10, {
            message: "Debe tener al menos 10 caracteres.",
        })
        .max(160, {
            message: "Debe tener maximo 130 caracteres.",
        }),

    tipoCotizacionPintura: z
        .string({
            required_error: "El tipo de cotizacion es requerido",
        }),

    elementosPintura: z.enum(["Si", "No"], {
        required_error: "Debe elegir una opcion",
    }),

    encargadoMaterialesPintura: z.enum(["Si", "No"], {
        required_error: "Debe elegir una opcion",
    }),
});
export function PintoresForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tipoSuperficie: "",
            tipoPared: "",
            imperfecciones: "",
            tipoCotizacionPintura: "",
            elementosPintura: "Si",
            encargadoMaterialesPintura: "Si",
        },
    })
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        console.log(values)
    }
    // ...
    console.log(form.control)
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="tipoSuperficie"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>¿Qué desea pintar?</FormLabel>
                            <FormControl>
                                <Select onValueChange={(e) => {
                                    console.log(e)
                                    field.onChange
                                }} defaultValue={field.value}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Seleccione un opción" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Pared">Pared </SelectItem>
                                        <SelectItem value="Techo">Techo</SelectItem>
                                        <SelectItem value="Rejas">Rejas</SelectItem>
                                        <SelectItem value="Otros">Otros</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* esto de deberia mostrar si el cliente elige la opcion "Pared" */}
                {<FormField
                    control={form.control}
                    name="tipoPared"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>¿Qué tipo de pared es?</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Seleccione un opción" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Pared">Ladrillo</SelectItem>
                                        <SelectItem value="Techo">Yeso</SelectItem>
                                        <SelectItem value="Rejas">Durlock</SelectItem>
                                        <SelectItem value="Alisado de cemento">Alisado de cemento</SelectItem>
                                        <SelectItem value="Otros">Otros</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />}

                <FormField
                    control={form.control}
                    name="imperfecciones"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>¿Cuenta con imperfecciones?</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Escriba los detalles aquí...f"
                                    className="resize-none"
                                    {...field}
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
                    name="tipoCotizacionPintura"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>¿En base a qué desea que sea la cotización?</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Seleccione un opción" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Costo de los productos">Costo de los productos</SelectItem>
                                        <SelectItem value="Tiempo de trabajo">Tiempo de trabajo</SelectItem>
                                        <SelectItem value="Cantidad de manos">Cantidad de manos</SelectItem>
                                        <SelectItem value="Trabajo finalizado">Trabajo finalizado</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                            <div className="w-[465px] text-sm
                             bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
                                role="alert">
                                <p className="font-bold">Nota</p>
                                <FormDescription>
                                    Si no selecciona una opción, correrá por cuenta del solucionador definir que método de presupuestacion desee utilizar.
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="elementosPintura"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>¿Cuenta con los siguientes elementos?: rodillo, pincel fino/grueso, pintura que desea, u otro.</FormLabel>
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
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* esto de deberia mostrar si el cliente no cuenta con los materiales de trabajo */}
                <FormField
                    control={form.control}
                    name="encargadoMaterialesPintura"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>¿Desea que el pintor se encargue de buscar los materiales y pasar un presupuesto del mismo</FormLabel>
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
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Cotizar</Button>
            </form>
        </Form>
    )
}