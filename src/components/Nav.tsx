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
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "@/app/ui/sheet-solucionado";
import { Menu } from "lucide-react";
import { Poppins } from "next/font/google";
import { Separator } from "@/app/ui/separator";

const poppins = Poppins({
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: "normal",
  subsets: ["latin"],
});

export default function Nav() {
  const router = useRouter();
  const pathName = usePathname();
  const user = useUser();
  const userMetadata = user?.user?.unsafeMetadata;

  const { data: numberOfNotifications } = api.notification.countUnRead.useQuery(
    undefined,
    {
      enabled: !!user.isSignedIn,
      staleTime: Infinity,
    }
  );
  // console.log(numberOfNotifications);

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

  // console.log(user)
  return (
    <>

      <nav id="navBar" className={`fixed top-0 left-0 flex w-[calc(100vw)] transition-colors duration-300 items-center justify-start z-20 py-0 ${pathName === '/' ? "  bg-transparent text-white" : "bg-solBlue text-white"} px-6  backdrop-filter`}>

        <Sheet  >
          <SheetTrigger className="navbar-burger order-first flex items-center p-3 pl-0 hover:text-solYellow" >

            <Menu className="h-6 w-6" />
            <span className="sr-only">Close</span></SheetTrigger>

          <SheetContent side={'left'} className={`bg-gray-50 w-[200px] shadow-xl p-0 pb-4 border-0 ${poppins.className}`}>

            <nav className=" flex z-50 flex-col justify-between h-full ">


              <ul id="linksmobile" className="mb-9">

                <li className="mb-1">
                  <SheetClose asChild  >
                    <Link

                      className={` ${pathName === "/"
                        ? "font-semibold text-sol_lightBlue"
                        : ""
                        } block rounded p-4 text-sm font-semibold text-gray-950 hover:bg-gray-200`}
                      href="/"
                    >
                      Inicio
                    </Link>
                  </SheetClose>
                </li>


                <li className="mb-1">
                  <SheetClose asChild  >
                    <Link
                      className={`block rounded p-4 text-sm font-semibold text-gray-950 hover:bg-gray-200`}
                      href="/"
                    >
                      Sobre Nosotros
                    </Link>
                  </SheetClose>
                </li>


                <li className="mb-1">
                  <SheetClose asChild  >
                    <Link
                      className={` ${pathName === "/contacto"
                        ? "font-semibold text-sol_lightBlue"
                        : ""
                        } block rounded p-4 text-sm font-semibold text-gray-950 hover:bg-gray-200`}
                      href="/contacto"
                    >
                      Contacto
                    </Link>
                  </SheetClose>
                </li>

                <Separator className="w-full" />
                {user.isSignedIn && (
                  <>

                    <li className="mb-1">
                      <SheetClose asChild  >
                        <Link
                          className={`  ${pathName === "/perfil"
                            ? "font-semibold text-sol_lightBlue"
                            : ""
                            } block rounded p-4 text-sm font-semibold text-gray-950 hover:bg-gray-200`}
                          href="/perfil"
                        >
                          Perfil
                        </Link>
                      </SheetClose>
                    </li>

                    <li className="mb-1">
                      <SheetClose asChild  >
                        <Link
                          className={`  ${pathName === "/servicios"
                            ? "font-semibold text-sol_lightBlue"
                            : ""
                            } block rounded p-4 text-sm font-semibold text-gray-950 hover:bg-gray-200`}
                          href="/servicios"
                        >
                          Mis Servicios
                        </Link>
                      </SheetClose>

                    </li>

                    <li className="mb-1">
                      <SheetClose asChild  >
                        <Link
                          className={`  ${pathName === "/solicitudes-de-servicio"
                            ? "font-semibold text-sol_lightBlue"
                            : ""
                            } block rounded p-4 text-sm font-semibold text-gray-950 hover:bg-gray-200`}
                          href="/solicitudes-de-servicio"
                        >
                          Mis solicitudes de servicio
                        </Link>
                      </SheetClose>

                    </li>

                    {userMetadata?.role === "SOLUCIONADOR" && <>

                    <Separator className="w-full" />

                      <li className="mb-1">
                        <SheetClose asChild  >
                          <Link
                            className={`  ${pathName === "/servicios/solucionador"
                              ? "font-semibold text-sol_lightBlue"
                              : ""
                              } block rounded p-4 text-sm font-semibold text-gray-950 hover:bg-gray-200`}
                            href="/servicios/solucionador"
                          >
                            Servicios como solucionador
                          </Link>
                        </SheetClose>
                      </li>
                      <li className="mb-1">
                        <SheetClose asChild  >
                          <Link
                            className={`  ${pathName === "/solucionador/solicitudes-de-servicio"
                              ? "font-semibold text-sol_lightBlue"
                              : ""
                              } block rounded p-4 text-sm font-semibold text-gray-950 hover:bg-gray-200`}
                            href="/solucionador/solicitudes-de-servicio"
                          >
                            Ver solicitudes en la zona
                          </Link>
                        </SheetClose>
                      </li>
                    </>
                    }
                  </>)
                }
              </ul>
              <div className="mt-auto mx-4">
                {!user.isSignedIn && (
                  <div className="pt-6">
                    <SheetClose asChild  >
                      <Link
                        className="mb-3 block rounded-xl bg-gray-50 px-4 py-3 text-center text-xs  font-semibold leading-loose shadow hover:bg-gray-200"
                        href={`/login?redirect=${pathName as string}`}
                      >
                        Iniciar Sesión
                      </Link>
                    </SheetClose>
                    <SheetClose asChild  >
                      <Link
                        className="mb-2 block rounded-xl bg-turquesa px-4 py-3 text-center text-xs font-semibold leading-loose text-black  hover:bg-solYellow"
                        href="/registro"
                      >
                        Quiero ser solucionador
                      </Link>
                    </SheetClose>
                  </div>
                )}
                {!!user.isSignedIn && (
                  <SheetClose asChild  >
                    <SignOutButton>
                      <button className="  rounded-xl bg-turquesa px-6 py-2 text-sm font-semibold text-gray-900 transition duration-200 hover:bg-solYellow hover:text-black">
                        Cerrar Sesion
                      </button>
                    </SignOutButton>
                  </SheetClose>
                )}

                <p className="my-4 text-center text-xs text-gray-50">
                  <span>Copyright © 2021</span>
                </p>
              </div>
            </nav>

          </SheetContent>
        </Sheet>
        <Link

          className="w-[140px] "
          href="/"
        >
          <Image
            id='logo'
            src="/solucionado.svg"
            height={35}
            width={140}
            className={`object-contain bg-solBlue py-4 px-2 md:p-4 z-10  `}
            alt="logo solucionado"
          />

        </Link>

        <ul
          className={`lg:absolute  lg:left-1/2 lg:top-1/2 hidden lg:-translate-x-1/2 lg:-translate-y-1/2 transform  lg:mx-auto lg:flex  lg:w-auto lg:items-center lg:space-x-6`}
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
            <Link
              className={`text-sm sm:text-lg ${pathName === "/sobre-nosotros"
                ? "font-semibold underline decoration-solYellow  	"
                : " hover:underline  hover:decoration-solYellow"
                } decoration-4  underline-offset-8 `}
              href="/"
            >
              Sobre nosotros
            </Link>
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
        <div className="absolute top-0 right-6 lg:pr-4 h-full flex items-center  gap-4 ">
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
                className=" rounded-xl bg-turquesa px-4 py-2 text-sm font-semibold  transition duration-200 hover:bg-solYellow text-black hover:text-black  cursor-pointer"
                onClick={() => void router.replace(`/registro?redirect=${pathName as string}`, {
                  scroll: false,
                })}
              >
                Únete
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


        </div>

      </nav>



    </>
  );

}
