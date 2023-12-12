"use client"

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignOutButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import Image from "next/image";
import NotificationsComponent from "./notifications/NotificationsComponent";
import ProfileDropdown from "./auth/ProfileDropdown";
import { api } from "~/utils/api";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/app/ui/sheet";

export default function Nav() {
  const router = useRouter();
  const pathName = usePathname();
  const user = useUser();

  const popover = React.useRef<HTMLDialogElement>(null);
  const { data: numberOfNotifications } = api.notification.countUnRead.useQuery(
    undefined,
    {
      enabled: !!user.isSignedIn,
      staleTime: Infinity,
    }
  );
  // console.log(numberOfNotifications);

  const handleBurgerClick = () => {
    const { current: el } = popover;
    el?.show();
    (el?.firstChild as HTMLDivElement)?.classList.remove("w-0", "opacity-0");
    (el?.firstChild as HTMLDivElement)?.classList.add("w-9/12", "opacity-100");
  };

  const closeDialog = () => {
    const { current: el } = popover;
    (el?.firstChild as HTMLDivElement)?.classList.remove(
      "w-9/12",
      "opacity-100"
    );
    (el?.firstChild as HTMLDivElement)?.classList.add("w-0", "opacity-0");
    sleep(500)
      .then(() => el?.close())
      .catch((err) => console.log(err));
  };
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }


  useEffect(() => {
    const handleColorChange = () => {
      // console.log(pathName);
      const navBar = document.getElementById('navBar');
      const logo = document.getElementById('logo');
      if (!!window && !!navBar) {
        const classnav = navBar.classList;
        const classLogo = logo?.classList;
        if (pathName !== '/') {
          classLogo?.add('bg-transparent')
          classLogo?.remove('bg-solBlue')
          classnav?.add('bg-solBlue/90', 'text-white', 'backdrop-blur-md')
          classnav?.remove('bg-transparent', 'text-gray-950')
        }
        if (window.scrollY >= 150) {
          if (!classnav.contains('bg-solBlue/90')) {

            // console.log("cambio de color", pathName);
            if (pathName === '/') {
              classLogo?.add('bg-transparent')
              classLogo?.remove('bg-solBlue')
              classnav?.add('bg-solBlue/90', 'text-white', 'backdrop-blur-md')
              classnav?.remove('bg-transparent', 'text-gray-950')
            }
            else {
              classLogo?.add('bg-transparent')
              classLogo?.remove('bg-solBlue')
              classnav?.add('bg-solBlue/90', 'text-white', 'backdrop-blur-md')
              classnav?.remove('bg-transparent', 'text-gray-950')
            }
          }
        } else {
          if (!classnav.contains('bg-transparent')) {
            // console.log("transparente", pathName);
            classLogo?.remove('bg-transparent')
            classLogo?.add('bg-solBlue')
            if (pathName === '/') {
              // console.log("transparente en home");
              classnav?.add('bg-transparent', 'text-white')
              classnav?.remove('bg-solBlue/90', 'backdrop-blur-md')
            }
            else {
              // console.log("transparente fuera de home");
              classLogo?.add('bg-transparent')
              classLogo?.remove('bg-solBlue')
              classnav?.add('bg-solBlue/90', 'text-white', 'backdrop-blur-md')
              classnav?.remove('bg-transparent', 'text-gray-950')
            }
          }
        }
      }
    }
    window.addEventListener("scroll", handleColorChange);

  }, [pathName])
  useEffect(() => {
    /**
     * close the popover if clicked on outside of the element
     */

    const { current: el } = popover;
    const linksmobile = document.getElementById("linksmobile");
    const burger = document.getElementById("burger");
    function handleClickOutside(event: MouseEvent) {
      if (
        el &&
        !el.contains(event.target as Node) &&
        !burger?.contains(event.target as Node) ||
        linksmobile?.contains(event.target as Node)
      ) {
        (el?.firstChild as HTMLDivElement)?.classList.remove(
          "w-9/12",
          "opacity-100"
        );
        (el?.firstChild as HTMLDivElement)?.classList.add("w-0", "opacity-0");
        sleep(500)
          .then(() => el?.close())
          .catch((err) => console.log(err));
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popover]);
  return (
    <>

      <nav id="navBar" className={`fixed top-0 left-0 flex w-[calc(100vw)] transition-colors duration-300 items-center justify-between z-20 py-0 ${pathName === '/' ? "  bg-transparent text-white" : "bg-solBlue text-white"} sm:px-12 backdrop-filter`}>
        <Link
          id='logo'
          className="bg-solBlue py-4 px-2 md:p-4 z-10"
          href="/"
        >
          <Image

            src="/solucionado.svg"
            height={35}
            width={140}
            className={`object-contain `}
            alt="logo solucionado"
          />

        </Link>

        <ul
          className={`xl:absolute  xl:left-1/2 xl:top-1/2 hidden xl:-translate-x-1/2 xl:-translate-y-1/2 transform lg:mx-auto lg:flex  lg:w-auto lg:items-center lg:space-x-6`}
        >
          <li>
            <Link
              className={`text-sm sm:text-lg ${pathName === "/"
                ? "font-semibold underline decoration-solYellow  		"
                : "  hover:underline  hover:decoration-solYellow"
                } decoration-4   underline-offset-8 `}
              href="/"
            >
              Inicio
            </Link>
          </li>


          <li>
            <a
              className={`text-sm sm:text-lg ${pathName === "/sobre-nosotros"
                ? "font-semibold underline decoration-solYellow  	"
                : " hover:underline  hover:decoration-solYellow"
                } decoration-4  underline-offset-8 `}
              href="/sobre-nosotros"
            >
              Sobre nosotros
            </a>
          </li>


          <li>
            <Link
              className={`text-sm sm:text-lg ${pathName === "/contacto"
                ? "font-semibold underline decoration-solYellow  		"
                : "  hover:underline  hover:decoration-solYellow"
                } decoration-4   underline-offset-8 `}
              href="/contacto"
            >
              Contacto
            </Link>
          </li>
        </ul>
        <div className="flex items-center  gap-4">
          {(
            <SignedOut >
              <Link
                className="hidden rounded-xl bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-900 transition  duration-200 hover:bg-gray-200 lg:inline-block cursor-pointer"
                href={{
                  pathname: "/login",
                  query: {
                    redirect: pathName as string,
                  },
                }}

              >
                Iniciar Sesión
              </Link>
              <span
                className="hidden rounded-xl bg-turquesa px-4 py-2 text-sm font-semibold  transition duration-200 hover:bg-solYellow text-black hover:text-black lg:inline-block cursor-pointer"
                onClick={() => void router.replace(`/registro?redirect=${pathName as string}`, {
                  scroll: false,
                })}
              >
                Quiero ser solucionador
              </span>
            </SignedOut>
          )}
          {(
            <SignedIn>
              {
                <NotificationsComponent
                  notificationsNumber={numberOfNotifications || 0}
                />
              }
              <ProfileDropdown>
                <Avatar
                  className="cursor-pointer"
                  onClick={() => {
                    void router.replace("/perfil");
                  }}
                >

                  <AvatarImage src={user?.user?.imageUrl ?? undefined} />
                  <AvatarFallback>
                    <div className="animate-spin rounded-full  border-b-2 border-gray-900"></div>
                  </AvatarFallback>
                </Avatar>
              </ProfileDropdown>
            </SignedIn>
          )}
          <Sheet >
            <SheetTrigger><div className="navbar-burger flex items-center p-3  hover:text-solYellow">
              <svg
                className="block h-4 w-4 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </div></SheetTrigger>
            <SheetContent className="bg-sol_darkBlue/80 filter backdrop-blur-md p-2">
              <nav className=" flex z-50 flex-col justify-between h-full p-2">
                <div className="mb-9 flex items-center ">


                </div>

                <ul id="linksmobile">
                  <li className="mb-1">
                    <Link
                      className="block rounded p-4 text-sm font-semibold text-gray-100 hover:bg-slate-300"
                      href="/"
                    >
                      Inicio
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      className="block rounded p-4 text-sm font-semibold text-gray-100 hover:bg-slate-300"
                      href="/"
                    >
                      Sobre Nosotros
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      className="block rounded p-4 text-sm font-semibold text-gray-100 hover:bg-slate-300"
                      href="/contacto"
                    >
                      Contacto
                    </Link>
                  </li>
                </ul>
                <div className="mt-auto mx-4">
                  {!user.isSignedIn && (
                    <div className="pt-6">
                      <Link
                        className="mb-3 block rounded-xl bg-gray-50 px-4 py-3 text-center text-xs  font-semibold leading-loose shadow hover:bg-gray-200"
                        href={`/login?redirect=${pathName as string}`}
                      >
                        Iniciar Sesión
                      </Link>
                      <Link
                        className="mb-2 block rounded-xl bg-turquesa px-4 py-3 text-center text-xs font-semibold leading-loose text-black  hover:bg-solYellow"
                        href="/registro"
                      >
                        Quiero ser solucionador
                      </Link>
                    </div>
                  )}
                  {!!user.isSignedIn && (
                    <SignOutButton>
                      <button className="  rounded-xl bg-turquesa px-6 py-2 text-sm font-semibold text-gray-900 transition duration-200 hover:bg-solYellow hover:text-black">
                        Cerrar Sesion
                      </button>
                    </SignOutButton>
                  )}

                  <p className="my-4 text-center text-xs text-gray-50">
                    <span>Copyright © 2021</span>
                  </p>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

        </div>

      </nav>



    </>
  );

}
