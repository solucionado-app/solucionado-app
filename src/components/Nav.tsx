import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SignOutButton, SignedIn, useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import Image from "next/image";
import NotificationsComponent from "./notifications/NotificationsComponent";
import ProfileDropdown from "./auth/ProfileDropdown";
import { api } from "~/utils/api";

export default function Nav() {
    const router = useRouter();
    const user = useUser();

    const popover = React.useRef<HTMLDialogElement>(null);
    const { data: numberOfNotifications } = api.notification.countUnRead.useQuery(undefined, {
        enabled: !!user.isSignedIn,
    });
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
        /**
         * close the popover if clicked on outside of the element
         */

        const { current: el } = popover;
        const burger = document.getElementById("burger");
        function handleClickOutside(event: MouseEvent) {
            if (
                el &&
                !el.contains(event.target as Node) &&
                burger?.contains(event.target as Node) === false
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
            <div className="w-full bg-sol_darkBlue px-4 py-6 text-white sm:px-12  sm:py-4">
                <div className="flex items-center justify-end md:justify-between">
                    <a
                        className="hidden transition-colors hover:text-solYellow md:block"
                        href="http://wa.me/5492994014514"
                    >
                        +01 1234567890
                    </a>
                    <a
                        className="hidden transition-colors hover:text-solYellow md:block"
                        href="#"
                    >
                        info@solucionado.com.ar
                    </a>
                    <ul className="social_icon1 flex">
                        <li className="px-2">Seguinos</li>
                        <li className="px-2">
                            <a href="#">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
                                </svg>
                            </a>
                        </li>
                        <li className="px-2">
                            <a href="#">
                                <svg
                                    fill="#FFFFFF"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 50 50"
                                >
                                    <path d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z" />
                                </svg>
                            </a>
                        </li>
                        <li className="px-2">
                            <a href="#">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0,0,256,256"
                                    fillRule="nonzero"
                                >
                                    <g
                                        fill="#ffffff"
                                        fillRule="nonzero"
                                        stroke="none"
                                        strokeWidth="1"
                                        strokeLinecap="butt"
                                        strokeLinejoin="miter"
                                        strokeMiterlimit="10"
                                        strokeDasharray=""
                                        strokeDashoffset="0"
                                        fontFamily="none"
                                        fontWeight="none"
                                        fontSize="none"
                                        textAnchor="none"
                                    >
                                        <g transform="scale(5.33333,5.33333)">
                                            <path d="M8.421,14h0.052v0c2.79,0 4.527,-2 4.527,-4.5c-0.052,-2.555 -1.737,-4.5 -4.474,-4.5c-2.737,0 -4.526,1.945 -4.526,4.5c0,2.5 1.736,4.5 4.421,4.5zM4,17h9v26h-9zM44,26.5c0,-5.247 -4.253,-9.5 -9.5,-9.5c-3.053,0 -5.762,1.446 -7.5,3.684v-3.684h-9v26h9v-15v0c0,-2.209 1.791,-4 4,-4c2.209,0 4,1.791 4,4v15h9c0,0 0,-15.045 0,-16.5z"></path>
                                        </g>
                                    </g>
                                </svg>
                            </a>
                        </li>
                        <li className="px-2">
                            <a href="#">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0,0,256,256"
                                    width="50px"
                                    height="50px"
                                    fillRule="nonzero"
                                >
                                    <g
                                        fill="#ffffff"
                                        fillRule="nonzero"
                                        stroke="none"
                                        strokeWidth="1"
                                        strokeLinecap="butt"
                                        strokeLinejoin="miter"
                                        strokeMiterlimit="10"
                                        strokeDasharray=""
                                        strokeDashoffset="0"
                                        fontFamily="none"
                                        fontWeight="none"
                                        fontSize="none"
                                        textAnchor="none"
                                    >
                                        <g transform="scale(5.12,5.12)">
                                            <path d="M12,3c-4.96,0 -9,4.04 -9,9v26c0,4.96 4.04,9 9,9h26c4.96,0 9,-4.04 9,-9v-26c0,-4.96 -4.04,-9 -9,-9zM38,8h3c0.55,0 1,0.45 1,1v3c0,0.55 -0.45,1 -1,1h-3c-0.55,0 -1,-0.45 -1,-1v-3c0,-0.55 0.45,-1 1,-1zM25,10c5.33,0 10.01969,2.8 12.67969,7h4.32031v20c0,2.76 -2.24,5 -5,5h-24c-2.76,0 -5,-2.24 -5,-5v-20h4.32031c2.66,-4.2 7.34969,-7 12.67969,-7zM25,12c-7.17,0 -13,5.83 -13,13c0,7.17 5.83,13 13,13c7.17,0 13,-5.83 13,-13c0,-7.17 -5.83,-13 -13,-13zM25,16c4.96,0 9,4.04 9,9c0,4.96 -4.04,9 -9,9c-4.96,0 -9,-4.04 -9,-9c0,-4.96 4.04,-9 9,-9z"></path>
                                        </g>
                                    </g>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <nav className="d_none relative flex w-full items-center justify-between bg-solBlue px-4 py-8 text-white sm:px-12 ">
                <Link
                    className="flex items-center gap-2 text-3xl font-bold leading-none"
                    href="/"
                >
                    <Image
                        src="/solucionado-transparente.png"
                        height={35}
                        width={140}
                        className="object-contain"
                        alt="logo solucionado"
                    />
                </Link>

                <ul
                    className={`absolute  left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform lg:mx-auto lg:flex  lg:w-auto lg:items-center lg:space-x-6`}
                >
                    <li>
                        <Link
                            className={`text-sm sm:text-lg ${router.asPath === "/"
                                ? "font-bold text-solYellow"
                                : "text-gray-200 transition-colors hover:text-solYellow hover:underline"
                                }  hover:text-sol_lightBLue`}
                            href="/"
                        >
                            Home
                        </Link>
                    </li>

                    <li>
                        <a
                            className={`text-sm sm:text-lg ${router.asPath === "/sobre-nosotros"
                                ? "font-bold text-solYellow"
                                : "text-gray-200 transition-colors hover:text-solYellow hover:underline"
                                } hover:text-sol_lightBLue`}
                            href="/sobre-nosotros"
                        >
                            Sobre nosotros
                        </a>
                    </li>

                    <li>
                        <Link
                            className={`text-sm sm:text-lg ${router.asPath === "/contacto"
                                ? "font-bold text-solYellow"
                                : "text-gray-200 transition-colors hover:text-solYellow hover:underline"
                                }  hover:text-sol_lightBLue`}
                            href="/contacto"
                        >
                            Contacto
                        </Link>
                    </li>
                </ul>

        <div className="flex items-center gap-4">
          {!user.isSignedIn && (
            <>
              <Link
                className="hidden rounded-xl bg-gray-50 px-4 py-2 text-sm font-bold text-gray-900 transition  duration-200 hover:bg-gray-100 lg:inline-block"
                href="/login"
              >
                Iniciar Sesión
              </Link>
              <Link
                className="hidden rounded-xl bg-blue-500 px-4 py-2 text-sm font-bold text-white transition duration-200 hover:bg-blue-600 lg:inline-block"
                href="/registro"
              >
                Registrarse
              </Link>
            </>
          )}
          {!!user.isSignedIn && (
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
                    void router.push("/perfil");
                  }}
                >
                  <AvatarImage src={user.user.imageUrl} />
                  <AvatarFallback>
                    <div className="animate-spin rounded-full  border-b-2 border-gray-900"></div>
                  </AvatarFallback>
                </Avatar>
              </ProfileDropdown>
            </SignedIn>
          )}
          <div id="burger" onClick={handleBurgerClick} className="lg:hidden">
            <button className="navbar-burger flex items-center p-1 text-white transition-colors hover:text-solYellow">
              <svg
                className="block h-7 w-7 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>


            <dialog
                ref={popover}
                className="transition-2 top-0 z-50 mb-0  ml-0 mt-0 h-screen w-0 max-w-sm p-0 "
            >
                <nav className="fixed bottom-0 left-0 top-0 flex w-9/12 max-w-sm flex-col overflow-y-auto border-r border-gray-400 bg-gray-200 px-4 py-4 opacity-0 transition-all duration-500">
                    <div className="mb-9 flex items-center ">
                        <Link className="mr-auto text-3xl font-bold leading-none" href="/">
                            <Image
                                src="/solucionado-transparente.png"
                                height={35}
                                width={140}
                                className="object-contain"
                                alt="logo solucionado"
                            />
                        </Link>
                        <button onClick={closeDialog} className="navbar-close">
                            <svg
                                className="h-6 w-6 cursor-pointer text-black hover:text-sol_darkBlue"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <ul>
                            <li className="mb-1">
                                <Link
                                    className="block rounded p-4 text-sm font-semibold text-zinc-900 hover:bg-slate-300"
                                    href="/"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="mb-1">
                                <Link
                                    className="block rounded p-4 text-sm font-semibold text-zinc-900 hover:bg-slate-300"
                                    href="/"
                                >
                                    Sobre Nosotros
                                </Link>
                            </li>
                            <li className="mb-1">
                                <Link
                                    className="block rounded p-4 text-sm font-semibold text-zinc-900 hover:bg-slate-300"
                                    href="/contacto"
                                >
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-auto">
                        {!user.isSignedIn && (
                            <div className="pt-6">
                                <Link
                                    className="mb-3 block rounded-xl bg-gray-50 px-4 py-3 text-center text-xs  font-semibold leading-loose shadow hover:bg-gray-100"
                                    href="/login"
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link
                                    className="mb-2 block rounded-xl bg-blue-600 px-4 py-3 text-center text-xs font-semibold leading-loose text-white  hover:bg-blue-700"
                                    href="/registro"
                                >
                                    Registrarse
                                </Link>
                            </div>
                        )}
                        {!!user.isSignedIn && (
                            <SignOutButton>
                                <button className="  rounded-xl bg-blue-500 px-6 py-2 text-sm font-bold text-white transition duration-200 hover:bg-blue-600">
                                    Cerrar Sesion
                                </button>
                            </SignOutButton>
                        )}

            <p className="my-4 text-center text-xs text-zinc-900">
              <span>Copyright © 2021</span>
            </p>
          </div>
        </nav>
      </dialog>
    </>
  );

}
