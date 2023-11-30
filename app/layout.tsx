import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/app/ui/separator"
import { SidebarNav } from "@/app/forms/components/sidebar-nav"
import "~/styles/globals.css";
import MainLayout from "@/src/components/layouts/MainLayout";
import { ClerkProvider, auth } from "@clerk/nextjs";



import { Inter } from "next/font/google";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/examples/forms",
  },
  {
    title: "Account",
    href: "/examples/forms/account",
  },
  {
    title: "Appearance",
    href: "/examples/forms/appearance",
  },
  {
    title: "Notifications",
    href: "/examples/forms/notifications",
  },
  {
    title: "Display",
    href: "/examples/forms/display",
  },
]


export const metadata: Metadata = {
  title: "Dashborad ",
  description: "En este apartado podras ver tus datos de usuario y modificarlos, las estadisticas y los servicios.",
}
interface SettingsLayoutProps {
  children: React.ReactNode

}
import { esES } from "~/utils/es-ES";

import { currentUser } from '@clerk/nextjs';
import Provider from "./_trpc/Provider";
import Nav from "@/src/components/Nav";
import Link from "next/link";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "./components/page-header";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/src/lib/utils";
import { buttonVariants } from "./ui/button";
import { ExamplesNav } from "./components/examples-nav";

const inter = Inter({
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: "normal",
  subsets: ["latin"],
});

export default async function RootLayout({ children }: SettingsLayoutProps) {
  const user = await currentUser();
  const { userId }: { userId: string | null } = auth();
  // console.log(user, userId);
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ClerkProvider {...user}  >
          <Provider>
            <main className=" min-h-screen flex justify-start flex-col">
              <Nav />

              <div className="flex h-full min-h-screen flex-col justify-center items-center text-slate-900 bg-gray-50 pt-20 ">
                <div className="container relative">
                  <PageHeader className="page-header pb-8">
                    <Link
                      href="/docs/changelog"
                      className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
                    >
                      🎉 <Separator className="mx-2 h-4 " orientation="vertical" />{" "}
                      <span className="sm:hidden">Style, a new CLI and more.</span>
                      <span className="hidden sm:inline">
                        Introducing Style, a new CLI and more.
                      </span>
                      <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </Link>
                    <PageHeaderHeading className="hidden md:block">
                      Check out some examples.
                    </PageHeaderHeading>
                    <PageHeaderHeading className="md:hidden">Examples</PageHeaderHeading>
                    <PageHeaderDescription>
                      Dashboard, cards, authentication. Some examples built using the
                      components. Use this as a guide to build your own.
                    </PageHeaderDescription>
                    <section className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
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
                    </section>
                  </PageHeader>
                  <section>
                    <ExamplesNav />
                    <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
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
