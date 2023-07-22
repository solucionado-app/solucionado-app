import React from "react";
import Nav from "../Nav";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            <Nav />
            <main className="flex min-h-screen flex-col items-center text-slate-900 p-4 bg-gradient-to-b from-slate-50 to-slate-100">{children}</main>
        </>
    );
}

