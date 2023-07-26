/* eslint-disable @typescript-eslint/no-misused-promises */
import { type SignedInAuthObject } from "@clerk/nextjs/server";
import { type GetStaticPropsContext, type GetStaticPaths, type InferGetStaticPropsType, } from "next";
import { ssgHelper } from "~/server/api/ssgHelper";
import { type JwtPayload, type ServerGetTokenOptions } from "@clerk/types";
import Head from "next/head";
import { type MyPage } from "~/components/types/types";

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
import { CalendarIcon } from "lucide-react"
import es from 'date-fns/locale/es';
import { cn } from "~/lib/utils"
import { format } from "date-fns"
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";

const locale = es;
 
const FormSchema = z.object({
  price: z.coerce.number().min(2000, {
    message: "debe haber al menos un valor mayor a 2000.",
  }),
  description: z
    .string()
    .min(10, {
        message: "Debe tener al menos 10 caracteres.",
    })
    .max(160, {
        message: "Debe tener maximo 130 caracteres.",
    }),
    estimatedAt: z.date({
        required_error: "La fecha estimada es requerida.",
    }),
})

const CategoryPage: MyPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ id }) => {

    const {user , isSignedIn} = useUser()
    const { data: serviceRequest } = api.serviceRequest.findById.useQuery({ id })
    const mutateBugdet = api.budget.create.useMutation()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
      })

      function onSubmit(data: z.infer<typeof FormSchema>) {
        mutateBugdet.mutate({
            serviceRequestId: id,
            price: data.price,
            description: data.description,
            estimatedAt: data.estimatedAt,
            userId:user?.id as string
        })
        console.log(data)
      }
    const rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
    return (
        <>
            <Head>
                <title>Contacto</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">

                <div className="text-xl font-semibold border  shadow-sm relative  p-5">
                    <h1 className="text-4xl font-extrabold tracking-tight">Informacion de Solicitud</h1>
                   {serviceRequest?.details && Object.keys(serviceRequest?.details).map((key: string, i) => (

                                            <p key={i}>
                                                <span> {key.replace(rex, '$1$4 $2$3$5')}</span>
                                                <span> {serviceRequest?.details && serviceRequest?.details[key as keyof typeof serviceRequest.details]}</span>                                                
                                            </p>
                                        ))}
                </div>
                <div>
                    <h1 className="text-5xl font-extrabold tracking-tight">Generar Presupuesto</h1>
                </div>
                <Form {...form}>
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
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
            </div>

        </>
    );
}

export default CategoryPage;
CategoryPage.Layout = "Main";

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: "blocking",
    };
};

export async function getStaticProps(
    context: GetStaticPropsContext<{ id: string }>
) {
    const id = context?.params?.id;

    if (id == null) {
        return {
            redirect: {
                destination: "/404",
            },
        };
    }
    const auth: SignedInAuthObject = {
        sessionId: '123',
        session: undefined,
        actor: undefined,
        userId: '123',
        user: undefined,
        orgId: undefined,
        orgRole: undefined,
        orgSlug: undefined,
        sessionClaims: {} as JwtPayload,
        organization: undefined,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getToken: function (options?: ServerGetTokenOptions | undefined): Promise<string | null> {
            throw new Error("Function not implemented.");
        },
        debug: function (): unknown {
            throw new Error("Function not implemented.");
        }
    }
    const ssg = ssgHelper(auth);
    await ssg.serviceRequest.findById.prefetch({ id });
    return {
        props: {
            trpcState: ssg.dehydrate(),
            id,
        },
    };
}

