import { useUser } from "@clerk/nextjs";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
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

export const ReviewServiceForm = () => {
  const { user, isSignedIn } = useUser();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
    },
  });
  return (
    user && (
      <>
        <Form {...form}>
          <div className="flex w-full flex-col gap-2">

            <form action="" className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reseña</FormLabel>
                    <FormControl>
                      <Textarea
                        className="w-full resize-none rounded border border-gray-300 bg-white p-2"
                        placeholder="Escriba los detalles aquí..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={!isSignedIn}
                type="submit"
                className="bg-solBlue text-white"
              >
                Enviar
              </Button>
            </form>
          </div>
        </Form>
      </>
    )
  );
};
