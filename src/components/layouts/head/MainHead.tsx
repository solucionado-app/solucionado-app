import Head from "next/head";
import { type PropsWithChildren } from 'react'

type props = {
    title: string;
    description: string;
}

export default function MainHead({ title, description }: PropsWithChildren<props>) {
    return (
        <Head>
            {/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" /> */}
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="description" content={description} />
            <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
            <title>{title}</title>
        </Head>
    )
}