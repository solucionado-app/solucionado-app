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

const formSchema = z.object({
    tipoSuperficie: z
        .string({
            required_error: "Dene elegir un a opción",
        }),
});
export default function PlomerosForm() {
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
                <Button type="submit">Cotizar</Button>
            </form>
        </Form>
    )
}