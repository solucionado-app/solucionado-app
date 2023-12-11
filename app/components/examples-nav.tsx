"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/app/ui/scroll-area"
import { useEffect, useRef } from "react"

const examples = [
  {
    name: "Dashboard",
    href: "/dashboard",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/dashboard",
  },
  {
    name: "Servicios",
    href: "/tasks",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/tasks",
  },
  {
    name: "Cuenta",
    href: "/forms",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/forms",
  },
]

interface ExamplesNavProps {
  className?: string;
}


export function ExamplesNav({ className, ...props }: ExamplesNavProps) {
  const pathname = usePathname()
  // const navbarRef = useRef<HTMLDivElement>(null)
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const nav = navbarRef.current
  //     if (!!window && !!nav) {
  //       console.log(nav?.className, window.scrollY, nav?.offsetTop)
  //       console.log(window.scrollY + 80 > nav?.offsetTop)

  //       if (window.scrollY + 80 > nav?.offsetTop) {
  //         nav.className = "sticky md:relative w-full top-16 left-0 z-50 bg-white shadow-sm md:shadow-none md:bg-transparent md:z-0"

  //       }
  //       else {
  //         nav.className = "relative"
  //       }
  //     }
  //   }


  //   window.addEventListener("scroll", handleScroll);

  // }, [pathname])
  return (
    <div className="sticky md:relative w-full top-16 left-0 z-50 bg-white shadow-sm md:shadow-none md:top-0 md:bg-transparent md:z-10">
      <ScrollArea className="max-w-[600px]  lg:max-w-none px-4 md:px-8">
        <div className={cn("mb-4 flex items-center gap-4", className)} {...props}>
          {examples.map((example) => (
            <Link
              href={example.href}
              key={example.href}
              className={cn(
                "flex items-center",
                pathname?.startsWith(example.href)
                  ? "font-bold text-primary"
                  : "font-medium text-muted-foreground"
              )}
            >
              {example.name}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
      {/* <ExampleCodeLink
        pathname={pathname === "/" ? "/examples/dashboard" : pathname}
      /> */}
    </div>
  )
}

interface ExampleCodeLinkProps {
  pathname: string | null
}

export function ExampleCodeLink({ pathname }: ExampleCodeLinkProps) {
  const example = examples.find((example) => pathname?.startsWith(example.href))

  if (!example?.code) {
    return null
  }

  return (
    <Link
      href={example?.code}
      target="_blank"
      rel="nofollow"
      className="absolute right-0 top-0 hidden items-center rounded-[0.5rem] text-sm font-medium md:flex"
    >
      View code
      <ArrowRightIcon className="ml-1 h-4 w-4" />
    </Link>
  )
}
