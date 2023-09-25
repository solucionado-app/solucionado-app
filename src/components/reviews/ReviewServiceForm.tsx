import { useUser } from "@clerk/nextjs";

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
import HoverRating from "./RatingComponent";
import { api } from "~/utils/api";
const FormSchema = z.object({
  content: z
    .string().optional(),
  rating: z.number().transform((val) => Math.round(val * 2) / 2),
});

interface Props {
  budgetAuthorId: string;
  serviceId: string;
  rating: number;
  content: string;
}



export const ReviewServiceForm = ({ budgetAuthorId, serviceId }: Props) => {

  const { data: review, isLoading } = api.review.findbyServiceId.useQuery({ serviceId: serviceId })

  const { user, isSignedIn } = useUser();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: review && review?.content ? review?.content : "",
      rating: review && review.rating ? Number(review.rating) : 0,
    },
  });
  console.log(Number(review?.rating));
  const { mutate } = api.review.createOrUpdate.useMutation();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    mutate({
      ...data,
      serviceId,
      userId: budgetAuthorId,
    })
    // console.log(data)
  } return (
    user && (
      <>
        <Form {...form}>

          {isLoading && <div>Cargando...</div>}
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          {!!review && <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Que te parecio el servicio</FormLabel>

                  <FormControl>
                    <HoverRating field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Por favor cuentanos mas acerca de este servicio</FormLabel>
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
              className="bg-solBlue text-white md:w-fit"
            >
              Enviar
            </Button>
          </form>}
        </Form>
      </>
    )
  );
};
