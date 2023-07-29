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

import es from 'date-fns/locale/es';
import { useRouter } from "next/router"
import { api } from "~/utils/api"
import { useFormSteps } from "./ContextForm"
import ProvinceAndCityOptions from "./ProvinceAndCityOptions"

const locale = es;

const formSchema = z.object({
    address: z
        .string({ required_error: "La direccion es requerida" }).min(10, { message: "Debe tener por lo menos 10 caracteres" }),
    description: z
        .string({ required_error: "el description es requerido" })
        .min(10, { message: "Debe tener al menos 10 caracteres." })
        .max(160, {
            message: "Debe tener maximo 130 caracteres.",
        }),
    date: z.date({
        required_error: "La fecha estimada es requerida.",
    }),
    province: z.object({
        id: z.string(),
        nombre: z.string(),
    }),
    city: z.object({
        id: z.string(),
        nombre: z.string(),

    }),

});


export default function GeneralForm() {
    const router = useRouter()
    const { formValues, setFormValues } = useFormSteps();
    const { currentStep, setCurrentStep } = useFormSteps();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: formValues.address ? formValues.address : "",
            description: formValues.description ? formValues.description : "",
            date: formValues.date ? formValues.date : new Date(),
            province: formValues.province ? formValues.province : null,
            city: formValues.city ? formValues.city : null,
        }
    })


    const requestMutation = api.serviceRequest.create.useMutation({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSuccess: (data) => {
            if (data?.id) {
                notification.mutate({
                    categorySlug: router.query?.slug as string,
                    title: "Nueva solicitud de servicio",
                    content: "Se ha creado una nueva solicitud de servicio",
                    link: `/solicitudes-de-servicio/${data.id}`,
                    serviceRequestId: data.id,
                })
            }
        },
    })
    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const notification = api.notification.create.useMutation()
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setFormValues({ ...formValues, ...values })
        handleNextStep()

        console.log(values)
    }
    // ...

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    <ProvinceAndCityOptions formSetValue={form.setValue} formGetValues={form.getValues} formControl={form.control} />
                    <FormField
                        control={form.control}
                        name="address"
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
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descripcion de el problema a solucionar</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Escriba un description aquí..."
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
                        name="date"
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
                                                    format(field?.value, "PPP", { locale })
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
                                            locale={es}
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={{ before: new Date() }}
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

                    <Button type="submit">Continuar</Button>
                </form>

            </Form>


        </>
    )
}