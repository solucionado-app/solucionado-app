import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "~/components/ui/use-toast";

const formSchema = z.object({
    email: z.string({ required_error: "La direccion es requerida" }).min(1, { message: "Debe tener por lo menos 1 caracter" }).email('Este no es un email valido'),
    name: z.string({ required_error: "La direccion es requerida" }).min(1, { message: "Debe tener por lo menos 1 caracter" }),
    message: z.string({ required_error: "La direccion es requerida" }).min(1, { message: "Debe tener por lo menos 1 caracter" }),
    subject: z.string({ required_error: "el subject es requerido" })

});

export default function ContactForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    const { toast } = useToast();


    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);

        toast({
            title: "Mensaje enviado",
            description: "",
            variant: "default",
            duration: 3000,
        });
        // try{
        //     await clerkClient.emails.createEmail({
        //         fromEmailName: "info",
        //         body: values.message,
        //         subject: values.subject,
        //         emailAddressId: user?.emailAddressId as string,
        //     })
        // }
        // catch(error){
        //     console.log(error)
        // }

    }

    return (
        <Form {...form} >
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="hola@test.com" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Juan perez" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Asunto</FormLabel>
                            <FormControl>
                                <Input placeholder="Asunto" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mensaje</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Escriba un mensaje aquí..."
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


                <Button type="submit">Enviar</Button>
            </form>

        </Form>
    );
}