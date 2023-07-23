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
import {
    RadioGroup,
    RadioGroupItem
} from "../ui/radio-group"
import { Textarea } from "../ui/textarea"
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "../ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "~/lib/utils"
import { Calendar } from "../ui/calendar"

const formSchema = z.object({
    direccionParaElServicio: z
    .string().min(2, {
        message: "Deben ir al menos 2 caracteres.",
    }),
    comentario: z
    .string()
    .min(10, {
        message: "Debe tener al menos 10 caracteres.",
    })
    .max(160, {
        message: "Debe tener maximo 130 caracteres.",
    }),
    fechaEstimada: z.date({
        required_error: "La fecha estimada es requerida.",
    }),
    urgencia: z.enum(["Si", "No"], {
        required_error: "Debe elegir una opcion",
    }),
});

export function GeneralForm() {
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
                    name="direccionParaElServicio"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Direccion para el servicio</FormLabel>
                        <FormControl>
                            <Input placeholder="Dirección" {...field} />
                        </FormControl>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="comentario"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Comentario</FormLabel>
                            <FormControl>
                            <Textarea
                                placeholder="Escriba un comentario aquí..."
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
                    name="fechaEstimada"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Fecha Estimada</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                {field.value ? (
                                    format(field.value, "PPP")
                                ) : (
                                    <span>Elija una fecha</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                control={form.control}
                name="urgencia"
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
                        <FormDescription>
                        </FormDescription>
                    </FormItem>
                )}
                />
                <Button type="submit">Cotizar</Button>
            </form>
        </Form>
    )
}