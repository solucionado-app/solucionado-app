import MainHead from "./head/MainHead";
import {type MainLayoutProps } from "./MainLayout";



export default function AuthLayout({ title = "Solucionado App", description = "Solucionado App", children }: MainLayoutProps) {
    return (
        <>
            <MainHead title={title} description={description} />
            <main className="flex h-screen flex-col items-center text-slate-900 p-4 bg-gradient-to-b from-slate-50 to-slate-100">{children}</main>
        </>
    );
}
