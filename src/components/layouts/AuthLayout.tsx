import React from "react";
import Nav from "../Nav";
export default function AuthLayout({ children }: React.PropsWithChildren<object>) {
    return (
        <>
            <Nav />
            <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100">{children}</main>
        </>
    );
}
