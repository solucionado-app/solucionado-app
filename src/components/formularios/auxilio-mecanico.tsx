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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
    tipoDeProblemaMecanico: z.enum(["Camilla", "Bateria"], {
        required_error: "Debe elegir una opcion",
    }),

    modeloDeCamilla: z
    .string().min(2, {
        message: "Deben ir al menos 2 caracteres.",
    }),

    ubicacionDelVehiculo: z
    .string()
    .min(10, {
        message: "Debe tener al menos 10 caracteres.",
    })
    .max(160, {
        message: "Debe tener maximo 130 caracteres.",
    }),

    destinoDelVehiculo: z
    .string()
    .min(10, {
        message: "Debe tener al menos 10 caracteres.",
    })
    .max(160, {
        message: "Debe tener maximo 130 caracteres.",
    }),

    modeloAnioDelVehiculo: z
    .string()
    .min(10, {
        message: "Debe tener al menos 10 caracteres.",
    })
    .max(160, {
        message: "Debe tener maximo 130 caracteres.",
    }),

    dondeEntregarBateria: z
    .string()
    .min(10, {
        message: "Debe tener al menos 10 caracteres.",
    })
    .max(160, {
        message: "Debe tener maximo 130 caracteres.",
    }),
});
export function AuxilioMecanicoForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        console.log(values)
    }
    // ...

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                control={form.control}
                name="tipoDeProblemaMecanico"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel>¿Qué necesita, bateria o camilla?</FormLabel>
                        <FormControl>
                            <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                            >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="Camilla" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        Camilla
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="Bateria" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        Bateria
                                    </FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                        <FormDescription>
                        </FormDescription>
                    </FormItem>
                )}
                />

                {/* este debieria parecer al elegir la opcion camilla */}
                <FormField
                    control={form.control}
                    name="modeloDeCamilla"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Modelo de camilla</FormLabel>
                        <FormControl>
                            <Input placeholder="Lugar" {...field} />
                        </FormControl>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="ubicacionDelVehiculo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>¿En dónde se encuentra el vehículo, calle, altura y ciudad?</FormLabel>
                            <FormControl>
                            <Textarea
                                placeholder="Escriba los detalles aquí..."
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
                    name="destinoDelVehiculo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>¿A qué dirección desea llevarlo?</FormLabel>
                            <FormControl>
                            <Textarea
                                placeholder="Escriba los detalles aquí..."
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

                {/* este deberia aparecer al elegir la opcion bateria */}
                <FormField
                    control={form.control}
                    name="modeloAnioDelVehiculo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>¿Qué modelo de vehículo es y año?</FormLabel>
                            <FormControl>
                            <Textarea
                                placeholder="Escriba los detalles aquí..."
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
                    name="dondeEntregarBateria"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>¿En dónde está ubicado?</FormLabel>
                            <FormControl>
                            <Textarea
                                placeholder="Escriba los detalles aquí..."
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

                <Button type="submit">Cotizar</Button>
            </form>
        </Form>
    )
}