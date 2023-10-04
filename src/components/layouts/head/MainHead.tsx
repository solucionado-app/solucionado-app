import Head from "next/head";

type props = {
    title: string;
    description: string;
}

export default function MainHead({ title, description }: props) {
    return (
        <Head>

            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="description" content={description} />
            <link rel="icon" type="image/svg+xml" href="/solucionado-iso.svg" />
            <title>{title}</title>
        </Head>
    )
}