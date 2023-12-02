import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/app/ui/separator"
import { SidebarNav } from "@/app/forms/components/sidebar-nav"
import "~/styles/globals.css";
import MainLayout from "@/src/components/layouts/MainLayout";
import { ClerkProvider, auth, useUser } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
}


const sidebarNavItems = [
  {
    title: "Profile",
    href: "/forms",
  },
  {
    title: "Account",
    href: "/forms/account",
  },
  {
    title: "Appearance",
    href: "/forms/appearance",
  },
  {
    title: "Notifications",
    href: "/forms/notifications",
  },
  {
    title: "Display",
    href: "/forms/display",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode

}
import { esES } from "~/utils/es-ES";

import { currentUser } from '@clerk/nextjs';
import Nav from "@/src/components/Nav";


export default function SettingsLayout({ children }: SettingsLayoutProps) {


  return (

    <>



      <div className=" space-y-6 p-5 md:p-10 pb-16 rounded-[0.5rem] border bg-background shadow ">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Perfil</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6 " />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="md:-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>


    </>

  )
}
