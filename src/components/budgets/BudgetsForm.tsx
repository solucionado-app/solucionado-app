import { useUser } from '@clerk/nextjs'
import { ServiceRequest, Status } from '@prisma/client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { Textarea } from "~/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Calendar } from "../../components/ui/calendar"
import es from 'date-fns/locale/es';
import { cn } from "~/lib/utils"
import { format } from "date-fns"
import { api } from "~/utils/api";
import { trpc } from '~/utils/trpc'



interface Props {
    serviceRequest: ServiceRequest | null | undefined,
    serviceRequestId: string
}
const locale = es;

const FormSchema = z.object({
    price: z.coerce.number().min(1999, {
        message: "debe haber al menos un valor mayor a 2000.",
    }),
    description: z
        .string()
        .max(160, {
            message: "Debe tener maximo 130 caracteres.",
        }),
    estimatedAt: z.date({
        required_error: "La fecha estimada es requerida.",
    }),
})

export default function BudgetsForm({ serviceRequest, serviceRequestId }: Props) {
    const { user, isSignedIn } = useUser()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            price: 2000,
            description: "",
            estimatedAt: new Date()
        }
    })
    const mutateBugdet = api.budget.create.useMutation()
    const utils = trpc.useContext()
    function onSubmit(data: z.infer<typeof FormSchema>) {
        mutateBugdet.mutate({
            serviceRequestId: serviceRequestId,
            price: data.price,
            description: data.description,
            estimatedAt: data.estimatedAt,
            userId: serviceRequest?.userId as string
        }, {
            onSuccess: () => {

                void utils.budget.findByRequestId.invalidate({ serviceRequestId: serviceRequestId })
                form.reset()
            }
        })

        console.log(data)
    }
    return (
        user && user?.id !== serviceRequest?.userId && <>
            <div>
                <h1 className="text-5xl font-extrabold tracking-tight">Generar Presupuesto</h1>
            </div><Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Precio</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Precio que debe ser mayor a 2000" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Debe haber al menos un valor mayor a 2000.
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
                                <FormLabel>Detalles</FormLabel>
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
                        name="estimatedAt"
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
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto h-4 w-4 opacity-50"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                                                {/* <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> */}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar

                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date === new Date() || date < new Date()
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
                    <Button disabled={!isSignedIn} type="submit">Generar Presupuesto</Button>
                </form>
            </Form>
        </>
    )
}
