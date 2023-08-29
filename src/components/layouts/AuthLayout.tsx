import React from "react";
import Nav from "../Nav";
export default function AuthLayout({ children }: React.PropsWithChildren<object>) {
    return (
        <>
            <Nav />
            <main className="flex h-full flex-col items-center text-slate-900 p-4 bg-gradient-to-b from-slate-50 to-slate-100">{children}</main>
        </>
    );
}
