/* eslint-disable */

import { useUser } from '@clerk/nextjs'
import { type ServiceRequest } from '@prisma/client'
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
import { Textarea } from "~/components/ui/textarea";

import { api } from "~/utils/api";
import { trpc } from '~/utils/trpc'



interface Props {
    serviceRequest: ServiceRequest | null | undefined,
    serviceRequestId: string
    categoryName: string | undefined | null,
}

const FormSchema = z.object({

    description: z
        .string()
        .min(10, {
            message: "Debe tener al menos 10 caracteres.",
        })
        .max(160, {
            message: "Debe tener maximo 130 caracteres.",
        }),
})

export default function CommentsForm({ serviceRequest, serviceRequestId, categoryName }: Props) {
    const { user, isSignedIn } = useUser()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            description: ""
        }
    })
    const mutateComment = api.comment.create.useMutation({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSuccess: (data) => {
            if (data?.id) {
                notification.mutate({
                    title: "Nueva solicitud de servicio",
                    content: `${user?.firstName ? user?.firstName : ""} ${user?.lastName ? user.lastName : ""} ha comentado tu solicitud de servicio`,
                    link: `/solicitudes-de-servicio/${serviceRequestId}?tab=comments#${data.id}`,
                    serviceRequestId: serviceRequestId,
                    userId: serviceRequest?.userId as string,
                    authorName: user?.firstName || "",
                    authorLastName: user?.lastName || "",
                    categoryName: categoryName || "",
                })
            }
        },
    })
    const utils = trpc.useContext()
    const notification = api.notification.createCommentNotification.useMutation()
    function onSubmit(data: z.infer<typeof FormSchema>) {
        mutateComment.mutate({
            serviceRequestId: serviceRequestId,
            description: data.description,
        }, {
            onSuccess: () => {
                void utils.notification.getAll.invalidate()
                void utils.notification.countUnRead.invalidate()
                void utils.comment.getAllByRequestId.invalidate({ serviceRequestId: serviceRequestId })
                form.reset()

            }
        })

        // console.log(data)
    }
    return (
        user && <>
            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-2">

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Comentario</FormLabel>
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

                    <Button disabled={!isSignedIn} type="submit">Comentar</Button>
                </form>
            </Form>
        </>
    )
}
