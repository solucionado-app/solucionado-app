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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

const formSchema = z.object({
    elementosPintura: z.enum(["Si", "No"], {
        required_error: "Debe elegir una opcion",
      }),
});
export function ArmadoresDeMueblesForm() {
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

                <Button type="submit">Cotizar</Button>
            </form>
        </Form>
    )
}