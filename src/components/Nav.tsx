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
    const handleColorChange = () => {
      const navBar = document.getElementById('navBar');
      const logo = document.getElementById('logo');
      if (!!window && !!navBar) {
        const classnav = navBar.classList;
        const classLogo = logo?.classList;

        if (window.scrollY >= 100) {
          if (!classnav.contains('bg-solBlue/90')) {
            console.log("cambio de color");
            classLogo?.add('bg-transparent')
            classLogo?.remove('bg-solBlue')
            classnav?.add('bg-solBlue/90', 'text-white', 'backdrop-blur-md')
            classnav?.remove('bg-transparent', 'text-gray-950')
          }
        } else {
          if (!classnav.contains('bg-transparent')) {
            console.log("transparente");
            classLogo?.remove('bg-transparent')
            classLogo?.add('bg-solBlue')
            if (router.asPath === '/') {
              classnav?.add('bg-transparent', 'text-white')
              classnav?.remove('bg-solBlue/90', 'backdrop-blur-md')
            }
            else {
              classnav?.add('bg-transparent', 'text-gray-950')
              classnav?.remove('bg-solBlue/90', 'text-white', 'backdrop-blur-md')
            }
          }
        }
      }
    }
    window.addEventListener("scroll", handleColorChange);

  }, [router.asPath])
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

      <nav id="navBar" className={`fixed top-0 left-0 flex w-full transition-colors duration-300 items-center justify-between bg-transparent z-20 py-0 ${router.asPath === '/' ? "text-white" : "text-gray-950"} sm:px-12 backdrop-filter`}>
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
          className={`absolute  left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform lg:mx-auto lg:flex  lg:w-auto lg:items-center lg:space-x-6`}
        >
          <li>
            <Link
              className={`text-sm sm:text-lg ${router.asPath === "/"
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
              className={`text-sm sm:text-lg ${router.asPath === "/sobre-nosotros"
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
              className={`text-sm sm:text-lg ${router.asPath === "/contacto"
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
          {!user.isSignedIn && (
            <>
              <span
                className="hidden rounded-xl bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-900 transition  duration-200 hover:bg-gray-200 lg:inline-block cursor-pointer"
                onClick={() => void router.push({
                  pathname: '/login',
                  query: { redirect: router.asPath }
                })}
              >
                Iniciar Sesión
              </span>
              <span
                className="hidden rounded-xl bg-turquesa px-4 py-2 text-sm font-semibold  transition duration-200 hover:bg-solYellow text-black hover:text-black lg:inline-block cursor-pointer"
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
            <button className="navbar-burger flex items-center p-3  hover:text-solYellow">
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
        <nav className="fixed bottom-0 left-0 top-0 flex w-9/12 max-w-sm flex-col overflow-y-auto  bg-solBlue px-4 py-4 opacity-0 transition-all duration-500">
          <div className="mb-9 flex items-center ">
            <Link className="mr-auto text-3xl font-semibold leading-none" href="/">
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
                className="h-6 w-6 cursor-pointer text-gray-50 hover:text-sol_darkBlue"
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
                  className="block rounded p-4 text-sm font-semibold text-gray-50 hover:bg-slate-300"
                  href="/"
                >
                  Inicio
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  className="block rounded p-4 text-sm font-semibold text-gray-50 hover:bg-slate-300"
                  href="/"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  className="block rounded p-4 text-sm font-semibold text-gray-50 hover:bg-slate-300"
                  href="/contacto"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-auto mx-4">
            {!user.isSignedIn && (
              <div className="pt-6">
                <Link
                  className="mb-3 block rounded-xl bg-gray-50 px-4 py-3 text-center text-xs  font-semibold leading-loose shadow hover:bg-gray-200"
                  href={`/login?redirect=${router.asPath}`}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  className="mb-2 block rounded-xl bg-turquesa px-4 py-3 text-center text-xs font-semibold leading-loose text-black  hover:bg-solYellow"
                  href="/registro"
                >
                  Registrarse
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
      </dialog>
    </>
  );

}
