import { type SignedInAuthObject } from "@clerk/nextjs/server";
import { type GetStaticPropsContext, type GetStaticPaths, type InferGetStaticPropsType, } from "next";
import { ssgHelper } from "~/server/api/ssgHelper";
import { type JwtPayload, type ServerGetTokenOptions } from "@clerk/types";
import Head from "next/head";
import { type MyPage } from "~/components/types/types";

import { api } from "~/utils/api";
import { FormStepsProvider } from "~/components/formularios/ContextForm";
import FormAll from "~/components/formularios/FormAll";






const CategoryPage: MyPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ slug }) => {

    const { data: category, isLoading } = api.categories.findBySlug.useQuery({ slug })

    return (
        <>
            <Head>
                <title>Contacto</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                    {isLoading && "Cargando"}
                    {category?.name}
                </h1>

                <FormStepsProvider >
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
    await ssg.categories.findBySlug.prefetch({ slug });
    return {
        props: {
            trpcState: ssg.dehydrate(),
            slug,
        },
    };
}

