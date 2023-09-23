import React from "react";
import Nav from "../Nav";
import MainHead from "./head/MainHead";

interface MainLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
}

export default function MainLayout({ title = "Solucionado App", description = "Solucionado App", children }: MainLayoutProps) {
    return (
        <>
            <MainHead title={title} description={description} />

            <main className=" min-h-screen flex justify-start flex-col">
                <Nav />
                <div className="flex h-full min-h-screen flex-col justify-center items-center text-slate-900 bg-slate-50 ">{children}</div>
            </main>
        </>
    );
}

