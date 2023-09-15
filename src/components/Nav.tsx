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
  const { data: numberOfNotifications } = api.notification.countUnRead.useQuery(
    undefined,
    {
      enabled: !!user.isSignedIn,
      staleTime: Infinity,
    }
  );
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

      <nav className=" sticky top-0 left-0 flex w-full items-center justify-between bg-azul z-20 px-4 py-4 text-white sm:px-12 ">
        <Link
          className="flex items-center gap-2 text-3xl font-bold leading-none"
          href="/"
        >
          <Image
            src="/solucionado-logo-horizontal.png"
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
                ? "font-bold underline decoration-solYellow 	underline-offset-4	decoration-from-font	"
                : "text-gray-50 transition-colors hover:text-solYellow hover:underline"
                }  hover:text-sol_lightBLue`}
              href="/"
            >
              Inicio
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
        <div className="flex items-center  gap-4">
          {!user.isSignedIn && (
            <>
              <span
                className="hidden rounded-xl bg-gray-50 px-4 py-2 text-sm font-bold text-gray-900 transition  duration-200 hover:bg-gray-100 lg:inline-block cursor-pointer"
                onClick={() => void router.push({
                  pathname: '/login',
                  query: { redirect: router.asPath }
                })}
              >
                Iniciar Sesión
              </span>
              <span
                className="hidden rounded-xl bg-blue-500 px-4 py-2 text-sm font-bold text-white transition duration-200 hover:bg-blue-600 lg:inline-block cursor-pointer"
                onClick={() => void router.push({
                  pathname: '/registro',
                  query: { redirect: router.asPath }
                })}
              >
                Registrarse
              </span>
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
            <button className="navbar-burger flex items-center p-3 text-white transition-colors hover:text-solYellow">
              <svg
                className="block h-4 w-4 fill-current"
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
                src="/solucionado-logo-horizontal.png"
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
                  Inicio
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
                  href={`/login?redirect=${router.asPath}`}
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
