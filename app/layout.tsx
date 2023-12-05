import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/app/ui/separator"
import { SidebarNav } from "@/app/forms/components/sidebar-nav"
import "~/styles/globals.css";
import MainLayout from "@/src/components/layouts/MainLayout";
import { ClerkProvider, auth } from "@clerk/nextjs";



import { Poppins } from "next/font/google";


export const metadata: Metadata = {
  title: "Dashborad ",
  description: "En este apartado podras ver tus datos de usuario y modificarlos, las estadisticas y los servicios.",
}
interface SettingsLayoutProps {
  children: React.ReactNode

}
import { esES } from "~/utils/es-ES";


import Provider from "./_trpc/Provider";
import Nav from "@/src/components/Nav";
import Link from "next/link";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "./components/page-header";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/src/lib/utils";
import { buttonVariants } from "./ui/button";
import { ExamplesNav } from "./components/examples-nav";
import { usePathname } from "next/navigation";

const inter = Poppins({
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: "normal",
  subsets: ["latin"],
});

export default function RootLayout({ children }: SettingsLayoutProps) {
  // console.log(user, userId);
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ClerkProvider  >
          <Provider>
            <main className=" min-h-screen flex justify-start flex-col">
              <Nav />

              <div className="flex h-full min-h-screen flex-col justify-center items-center text-slate-900 bg-gray-50 py-20 ">
                <div className="container relative">
                  <PageHeader className="page-header pb-8">
                    <Link
                      href="/solicitudes de servicio"
                      className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
                    >
                      🎉 <Separator className="mx-2 h-4 " orientation="vertical" />{" "}
                      <span className="sm:hidden">Style, a new CLI and more.</span>
                      <span className="hidden sm:inline">
                        Hemos actualizado la apariencia de las solicitudes, puedes agregar imagenes y mucho más.
                      </span>
                      <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </Link>
                    <PageHeaderHeading className="">
                      Panel de control.
                    </PageHeaderHeading>
                    <PageHeaderDescription>
                      Aca podras ver mas informacion sobre tu cuenta, rendimientos y estadisticas avanzadas.
                    </PageHeaderDescription>
                    {/* <section className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
                      <Link
                        href="/docs"
                        className={cn(buttonVariants(), "rounded-[6px]")}
                      >
                        Get Started
                      </Link>
                      <Link
                        href="/components"
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "rounded-[6px]"
                        )}
                      >
                        Components
                      </Link>
                    </section> */}
                  </PageHeader>
                  <section>
                    <ExamplesNav />
                    <div className="overflow-hidden ">
                      {children}
                    </div>
                  </section>
                </div>
              </div>
            </main>
          </Provider>
        </ClerkProvider>
      </body>
    </html>
  )
}
