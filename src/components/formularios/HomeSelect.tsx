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


  },
    { required_error: "la categoria es requerida.", }),
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
  //     // console.log(numeroDeLamparas)
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
          className=" flex w-full h-full max-w-3xl items-baseline justify-between  border-slate-600
            gap-3 max-[640px]:flex-wrap"
        >
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full space-y-1 h-14 shadow-md">
                <FormControl>
                  <Select
                    {...field}
                    styles={{
                      control: (styles) => ({
                        ...styles,
                        height: '3.5rem',
                        boxShadow: '0px 0px 0px 0px rgb(0 170 170)',
                        borderWidth: '2px',
                        borderColor: '#f8fafc',
                        backgroundColor: 'white',
                        color: 'rgb(2 2 2)',
                        '&:hover': {
                          boxShadow: '0px 0px 3px 0px rgb(100 116 139)',
                          borderColor: '#64748b',
                        },
                        '&:after': {
                          boxShadow: '0px 0px 3px 0px rgb(100 116 139)',
                          borderColor: '#64748b',
                        }
                      }),

                      menuList: (base) => ({
                        ...base,
                        borderWidth: '0px',
                        backgroundColor: '#1f2937',
                        color: 'rgb(255 255 255)',
                        '&:hover': {
                          backgroundColor: '#cbd5e1',
                          color: 'rgb(255 255 255)',
                        },

                        "::-webkit-scrollbar": {
                          width: "6px",
                          height: "0px",
                        },
                        "::-webkit-scrollbar-track": {
                          background: "#f1f1f1"
                        },
                        "::-webkit-scrollbar-thumb": {
                          background: "#888"
                        },
                        "::-webkit-scrollbar-thumb:hover": {
                          background: "#cbd5e1"
                        }
                      }),
                      container: (provided) => ({
                        ...provided,
                        width: '100%',
                        height: '100%',
                      }),
                      option: (provided, { isSelected, isFocused }) => ({
                        ...provided,
                        backgroundColor: isFocused || isSelected ? '#cbd5e1' : '#f8fafc',
                        color: 'rgb(2 2 2)',
                        '&:hover': {
                          backgroundColor: '#cbd5e1',
                          color: 'rgb(2 2 2)',
                        },
                        '&:focus': {
                          backgroundColor: '#cbd5e1',
                          color: 'rgb(2 2 2)',
                        },
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        color: '#020617',

                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: '#020617',
                      }),
                      input: (provided) => ({
                        ...provided,
                        color: '#020617',
                        borderColor: '#64748b',
                        borderRadius: '100rem',
                      }),
                      indicatorSeparator: (provided) => ({
                        ...provided,
                        backgroundColor: 'rgb(255 255 2 0)'

                      }),
                      clearIndicator: (provided) => ({
                        ...provided,
                        color: 'rgb(2 2 2)',
                        '&:hover': {
                          color: '#93c5fd',
                        },
                      }),
                      dropdownIndicator: (provided) => ({
                        ...provided,
                        display: 'none',
                      }),
                    }}

                    className="w-full m-0 p-0 "
                    isLoading={isLoading}
                    onChange={(option) => {
                      void router.push(`/solucionar/${option?.slug ?? ''}`);
                    }}
                    placeholder="Necesito ayuda con..."
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

          <Button
            size={"lg"}
            className=" bg-solYellow text-lg z-10  h-14 font-semibold text-black rounded-lg shadow-md hover:bg-solYellow/90 transition-colors w-full md:w-auto   max-[640px]:w-full"
            type="submit"
          >
            Buscar
          </Button>
        </form>
      </Form>

    </>
  );
}
