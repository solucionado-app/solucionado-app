import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/app/ui/separator"
import { SidebarNav } from "@/app/forms/components/sidebar-nav"
import "~/styles/globals.css";
import MainLayout from "@/src/components/layouts/MainLayout";
import { ClerkLoaded, ClerkProvider, auth } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
}

import { Poppins } from "next/font/google";

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

interface SettingsLayoutProps {
  children: React.ReactNode

}
import { esES } from "~/utils/es-ES";

import { currentUser } from '@clerk/nextjs';

const poppins = Poppins({
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: "normal",
  subsets: ["latin"],
});

export default async function RootLayout({ children }: SettingsLayoutProps) {
  const user = await currentUser();
  const { userId }: { userId: string | null } = auth();
  console.log(user, userId);
  return (
    <html lang="es">
      <body>
        <main className={poppins.className}>
          <ClerkProvider {...user}  >



            <main className=" min-h-screen flex justify-start flex-col">
              {children}
            </main>




          </ClerkProvider>
        </main>
      </body>
    </html>
  )
}
