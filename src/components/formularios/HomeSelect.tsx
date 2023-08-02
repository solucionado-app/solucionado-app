/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod";
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

import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { type Category } from "@prisma/client";
import Select from "react-select";
const formSchema = z.object({
  category: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    slug: z.string(),
  }),
});

interface props {
  categories: Category[];
  isLoading: boolean;
}
export default function HomeSelect({ categories, isLoading }: props) {
  // 1. Define your form.
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  // useEffect(() => {
  //     console.log(numeroDeLamparas)
  //     if (numeroDeLamparas && typeof numeroDeLamparas === "string") {
  //         setnumeroDeLamparasNumber(parseInt(numeroDeLamparas))
  //         form.setValue("numeroDeLamparas", parseInt(numeroDeLamparas))
  //     }
  // }, [router.query, numeroDeLamparas, form])

  // 2. Define a submit handler.

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    void router.push(`/solucionar/${values.category.slug}`);
  }
  // ...
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full max-w-md items-end justify-between gap-2 max-[400px]:flex-wrap"
        >
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full self-end">
                <FormLabel className="text-gray-700">Categoria</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    styles={{
                      control: (styles) => ({
                        ...styles,
                        backgroundColor: "white",
                      }),
                      menuList: (provided) => ({
                        ...provided,
                        backgroundColor: "white",
                      }),
                    }}
                    className="w-full "
                    isLoading={isLoading}
                    placeholder="Elige la categorias"
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id.toString()}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="mb-[9px] max-[400px]:w-full" type="submit">
            Buscar
          </Button>
        </form>
      </Form>
      {/* <Dialog open={open} onOpenChange={setOpen}>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Inicia Sesion!</DialogTitle>
                        <DialogDescription>
                            Inicia Sesion para Seguir con la cotizacion.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button onClick={() => void router.push({
                            pathname: "/login",
                            query: {
                                redirect: router.asPath,
                                ...formvalues
                            }
                        })} type="button">Continuar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog> */}
    </>
  );
}
