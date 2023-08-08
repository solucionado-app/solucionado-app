/* eslint-disable @typescript-eslint/no-misused-promises */
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
import { trpc } from "~/utils/trpc";
import { api } from "~/utils/api";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  description: z
    .string()
    .min(10, {
      message: "Debe tener al menos 10 caracteres.",
    })
    .max(160, {
      message: "Debe tener maximo 130 caracteres.",
    }),
});

type CommentProfileFormProps = {
  userId: string;
};

export const CommentProfileForm: React.FC<CommentProfileFormProps> = ({
  userId,
}) => {
  const { user, isSignedIn } = useUser();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
    },
  });
  const { mutate: createComment, isLoading } = api.comment.create.useMutation();
  const utils = trpc.useContext();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    createComment(
      {
        description: data.description,
        userId,
      },
      {
        onSuccess: () => {
          void utils.comment.getAllByUserId.invalidate({ userId });
          form.reset();
        },
      }
    );
  }
  return (
    user && (
      <>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2 rounded bg-white p-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm tracking-tight sm:text-lg">
                    Comentar
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Escriba los detalles aquí..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full justify-end">
              <Button
                disabled={!isSignedIn || isLoading}
                type="submit"
                className="bg-solBlue hover:bg-solBlue/80"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Comentar"}
              </Button>
            </div>
          </form>
        </Form>
      </>
    )
  );
};
