import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { isValidPhoneNumber } from "react-phone-number-input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "~/components/ui/form"
import { PhoneInput } from "~/components/ui/phone-input";
import { Button } from "~/components/ui/button"

const formSchema = z.object({
    phone: z
        .string()
        .refine(isValidPhoneNumber, { message: "Numero de telefono invalido" }),
});

export function PhoneNumberForm({ onSubmit }: { onSubmit: (values: z.infer<typeof formSchema>) => Promise<null | undefined> }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: "",
        }
    })

    return (
        <Form {...form}>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telofono</FormLabel>
                            <FormControl>
                                <PhoneInput
                                    defaultCountry="AR"
                                    numberInputProps={{ placeholder: "ej: 2994694512" }}
                                    countrySelectProps={{ disabled: true }}
                                    {...field} />
                            </FormControl>
                            <FormDescription>
                                Ingresa tu numero de telefono.
                                Enviaremos un codigo de verificacion con una expiracion de 10min.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit">Siguiente</Button>
            </form>
        </Form>
    )
}