/* eslint-disable */
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
import { format, set } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "~/lib/utils"
import { Calendar } from "../ui/calendar"

import es from 'date-fns/locale/es';
import { useFormSteps } from "./ContextForm"
import { FormValues, localStorageRequests } from "~/lib/localStorage"

import dynamic from "next/dynamic"
import { useRouter } from "next/router"

const locale = es;



const formSchema = z.object({
    photos: z.array(z.string()).optional(),
    portrait: z.string().optional(),
});



export default function GeneralForm() {
    const router = useRouter()
    const slug = router.query.slug as string;
    const { currentStep, setCurrentStep } = useFormSteps();
    const local: FormValues = localStorageRequests.get()
    const hasCategoryInLocal = slug in local && Object.prototype.hasOwnProperty.call(local, slug) && JSON.stringify(local[`${slug}`]) !== '{}';
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

    })

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };


    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        if (!!slug) {

            localStorageRequests.set({ ...localStorageRequests.get(), [slug]: { ...local[`${slug}`], ...values, currentStep: currentStep + 1 } })
            handleNextStep()
        }
    }


    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    <FormField
                        control={form.control}
                        name="photos"
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

                    <Button type="submit">Continuar</Button>
                </form>

            </Form>
        </>
    )
}