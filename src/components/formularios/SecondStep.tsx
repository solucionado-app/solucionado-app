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
    RadioGroup,
    RadioGroupItem
} from "../ui/radio-group"
import {
    CurrencyInput,
} from 'input-currency-react';

import { useRouter } from "next/router"
import { api } from "~/utils/api"
import { useFormSteps } from "./ContextForm"



const formSchema = z.object({

    urgency: z.enum(["Si", "No"], {
        required_error: "Debe elegir una opcion",
    }),
    amount: z.string({ required_error: "Debes introducir un monto", }).optional(),
    schedule: z.enum(["Mañana 07:00-12:00", "Media tarde 12:00-17:00", "Tarde 17:00-20:00", "Noche 20:00-7:00"], {
        errorMap: (issue, ctx) => ({ message: 'Eliga una franja horaria' })
    }),

});


export default function SecondStep() {
    const router = useRouter()
    const { formValues, setFormValues } = useFormSteps();
    const { currentStep, setCurrentStep } = useFormSteps();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            urgency: formValues.urgency ? formValues.urgency : "",
            amount: formValues.amount ? formValues.amount : "000",
            schedule: formValues.schedule ? formValues.schedule : "",
        }
    })



    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };



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




                    <FormField
                        control={form.control}
                        name="urgency"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>¿Es de urgencia?</FormLabel>
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
                    <FormField
                        control={form.control}
                        name="schedule"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Franja horaria de disponibilidad</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Mañana 07:00-12:00" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Mañana 07:00-12:00
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Media tarde 12:00-17:00" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Media tarde 12:00-17:00
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Tarde 17:00-20:00" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Tarde 17:00-20:00
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Noche 20:00-7:00" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Noche 20:00-7:00
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
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Monto Dispuesto a pagar (opcional)</FormLabel>
                                <FormControl>

                                    <CurrencyInput
                                        {...field}
                                        className="flex h-10 w-full rounded-md border border-gray-200  bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800  dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-800"
                                        // Initial value
                                        value={field.value || "000"}
                                        onChangeEvent={(_, maskedValue) => {
                                            field.onChange(maskedValue);
                                        }}
                                        autoFocus={false}
                                        options={{
                                            precision: 2,
                                            style: "currency",
                                            allowNegative: false, // Format Type
                                            i18nCurrency: "ARG" // Symbol
                                        }} />

                                </FormControl>
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