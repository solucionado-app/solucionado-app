import { type GetStaticPropsContext, type GetStaticPaths, type InferGetStaticPropsType, } from "next";
import { ssgHelper } from "~/server/api/ssgHelper";
import Head from "next/head";
import { type MyPage } from "~/components/types/types";

import { api } from "~/utils/api";
import { FormStepsProvider } from "~/components/formularios/ContextForm";
import FormAll from "~/components/formularios/FormAll";
import Link from "next/link";
import MainHead from "@/src/components/layouts/head/MainHead";






const CategoryPage: MyPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ slug }) => {

    const { data: category, isLoading, isFetched } = api.categories.findBySlug.useQuery({ slug }, {
        retry: 3,
    })

    if (category == null && isFetched && !isLoading) {
        return (
            <div className="grid place-content-center h-screen">
                <div className="container mx-auto max-w-md text-center">
                    <h1 className="text-4xl font-bold text-zinc-700 my-4">
                        404 - Page Not Found
                    </h1>
                    <p className="text-zinc-400">
                        Lo sentimos pero la página que buscas no existe. Por favor, revisa
                        la URL o utiliza el botón de abajo para volver a la página de
                        inicio.
                    </p>
                    {/*TODO: List similar pages here */}
                    {/*TODO: Create Search bar component here */}
                    <div className="border border-b-gray-50 my-4"></div>
                    {/* Add navigation to important pages */}
                    <div>
                        <Link
                            className="hover:underline hover:text-indigo-400 text-indigo-500"
                            href="/"
                        >
                            Ir a la Home Page
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <>
            <MainHead title={`buscar ${category?.name as string}`} description={category?.description ?? 'Solucionado'} />


            <div className="container flex flex-col items-center justify-center  px-4 py-6 ">
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                    {isLoading && "Cargando"}
                    {category?.name}
                </h1>


                <FormStepsProvider>
                    <FormAll />
                </FormStepsProvider>
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

export async function getStaticProps(context: GetStaticPropsContext<{ slug: string }>) {
    const slug = context?.params?.slug;

    if (slug == null) {
        return {
            redirect: {
                destination: "/404",
            },
        };
    }
    const ssg = ssgHelper(undefined);
    await ssg.categories.findBySlug.prefetch({ slug });
    return {
        props: {
            trpcState: ssg.dehydrate(),
            slug,
        },
    };
}

