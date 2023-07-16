import React from "react";
import Nav from "../Nav";
export default function MainLayout({ children }: React.PropsWithChildren<object>) {
    return (
        <>
            <Nav />
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">{children}</main>
        </>
    );
}
