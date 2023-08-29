import React from "react";
import Nav from "../Nav";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="h-screen flex flex-col">
            <Nav />
            <div className="flex h-full flex-col items-center text-slate-900 bg-gradient-to-b from-slate-50 to-slate-100">{children}</div>
        </div>
    );
}

