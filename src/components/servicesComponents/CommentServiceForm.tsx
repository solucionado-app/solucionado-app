/* eslint-disable */

import { useUser } from "@clerk/nextjs";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";

import { api } from "~/utils/api";
import { trpc } from "~/utils/trpc";
import { Status } from "@prisma/client";

interface Props {
  service: Service | null | undefined;
  serviceId: string;
  categoryName: string | undefined | null;
}

interface Service {
  id: string;
  status: Status;
  description: string;
  budget: Budget;
  category: {
    id: number;
    name: string;
  };
}

interface Author {
  id: string;
  first_name: string | null;
  last_name: string | null;
}
interface Budget {
  id: string;
  price: number;
  author: Author;
}

const FormSchema = z.object({
  description: z.string().max(160, {
    message: "Debe tener maximo 130 caracteres.",
  }),
});

export default function CommentServiceForm({
  service,
  serviceId,
  categoryName,
}: Props) {
  const { user, isSignedIn } = useUser();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
    },
  });
  const mutateComment = api.comment.create.useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // onSuccess: (data) => {
    //     if (data?.id) {
    //         notification.mutate({
    //             title: "Nueva solicitud de servicio",
    //             content: `${user?.firstName ? user?.firstName : ""} ${user?.lastName ? user.lastName : ""} ha comentado tu solicitud de servicio`,
    //             link: `/solicitudes-de-servicio/${serviceId}#${data.id}`,
    //             serviceId: serviceId,
    //             userId: service?.userId as string,
    //             authorName: user?.firstName || "",
    //             authorLastName: user?.lastName || "",
    //             categoryName: categoryName || "",
    //         })
    //     }
    // },
  });
  const utils = trpc.useContext();
  const notification = api.notification.createCommentNotification.useMutation();
  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutateComment.mutate(
      {
        serviceId: serviceId,
        description: data.description,
      },
      {
        onSuccess: () => {
          void utils.notification.getAll.invalidate();
          void utils.notification.countUnRead.invalidate();
          void utils.comment.getAllByServiceId.invalidate({
            serviceId: serviceId,
          });
          form.reset();
        },
      }
    );

    // console.log(data)
  }
  return (
    user && (
      <>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensaje</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder=""
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={!isSignedIn}
              type="submit"
              className="bg-sol_lightBlue hover:bg-sol_lightBlue/80"
            >
              Enviar
            </Button>
          </form>
        </Form>
      </>
    )
  );
}
