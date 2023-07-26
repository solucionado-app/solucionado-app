import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SignOutButton, SignedIn, useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import Image from "next/image";
import NotificationsPage from "./notifications/NotificationsComponent";
import ProfileDropdown from "./auth/ProfileDropdown";

export default function Nav() {

    const router = useRouter();
    const user = useUser();

    const popover = React.useRef<HTMLDialogElement>(null);

    const handleBurgerClick = () => {
        const { current: el } = popover;
        el?.show();
        (el?.firstChild as HTMLDivElement)?.classList.remove("w-0", "opacity-0");
        (el?.firstChild as HTMLDivElement)?.classList.add("w-9/12", "opacity-100");
    }

    const closeDialog = () => {
        const { current: el } = popover;
        (el?.firstChild as HTMLDivElement)?.classList.remove("w-9/12", "opacity-100");
        (el?.firstChild as HTMLDivElement)?.classList.add("w-0", "opacity-0");
        sleep(500).then(() => el?.close()).catch((err) => console.log(err))
    };
    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    useEffect(() => {
        /**
         * close the popover if clicked on outside of the element
         */

        const { current: el } = popover;
        const burger = document.getElementById("burger")
        function handleClickOutside(event: MouseEvent) {
            if (el && !el.contains(event.target as Node) && burger?.contains(event.target as Node) === false) {
                (el?.firstChild as HTMLDivElement)?.classList.remove("w-9/12", "opacity-100");
                (el?.firstChild as HTMLDivElement)?.classList.add("w-0", "opacity-0");
                sleep(500).then(() => el?.close()).catch((err) => console.log(err))


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
            <nav className=" w-full bg-[#032154] py-[9px] d_none text-white relative px-4 flex justify-between items-center ">
                <Link className="text-3xl font-bold leading-none" href="/">
                    <Image src="/solucionado-transparente.png" width={100} height={40} alt="#" />
                </Link>
                <div id="burger" onClick={handleBurgerClick} className="lg:hidden">
                    <button className="navbar-burger flex items-center text-cyan-300 p-3">
                        <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Mobile menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                        </svg>
                    </button>
                </div>
                <ul className={`hidden  absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto  lg:items-center lg:w-auto lg:space-x-6`}>
                    <li><Link className={`text-sm ${router.asPath === "/" ? "text-cyan-300 font-bold" : "text-gray-200"}  hover:text-sky-300`} href="/">Home</Link></li>

                    <li><a className={`text-sm ${router.asPath === "/sobre-nosotros" ? "text-cyan-300 font-bold" : "text-gray-200"}`} href="/sobre-nosotros">Sobre nosotros</a></li>


                    <li><Link className={`text-sm ${router.asPath === "/contacto" ? "text-cyan-300 font-bold" : "text-gray-200"}  hover:text-sky-300`} href="/contacto">Contacto</Link></li>
                    <SignedIn>

                        <li><Link className={`text-sm ${router.asPath === "/solicitudes-de-servicio" ? "text-cyan-300 font-bold" : "text-gray-200"}  hover:text-sky-300`} href="/solicitudes-de-servicio">Solicitudes de Servicio</Link></li>
                    </SignedIn>
                    <SignedIn>

                        <li><Link className={`text-sm ${router.asPath === "/completar-perfil" ? "text-cyan-300 font-bold" : "text-gray-200"}  hover:text-sky-300`} href="/completar-perfil">Completar Perfil</Link></li>
                    </SignedIn>
                </ul>
                <div className="hidden lg:flex">
                    {!user.isSignedIn && <>
                        <Link className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200" href="/login">Iniciar Sesión</Link>
                        <Link className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" href="/registro">Registrarse</Link>
                    </>}
                    {!!user.isSignedIn && <div className="flex gap-4">
                        <NotificationsPage />
                        <ProfileDropdown>
                            <Avatar className="cursor-pointer" onClick={() => { void router.push("/perfil") }}>
                                <AvatarImage src={user.user.imageUrl} />
                                <AvatarFallback><div className="animate-spin rounded-full  border-b-2 border-gray-900"></div></AvatarFallback>
                            </Avatar>
                        </ProfileDropdown>

                    </div>
                    }
                </div>
            </nav>

            <dialog ref={popover} className="top-0 transition-2 w-0 z-50  h-screen max-w-sm ml-0 mt-0 mb-0 p-0 " >

                <nav className="fixed top-0 left-0 bottom-0 flex opacity-0 flex-col w-9/12 max-w-sm py-4 px-4 transition-all duration-500 bg-gray-900 border-gray-500 border-r overflow-y-auto">
                    <div className="flex items-center mb-9 ">
                        <Link className="mr-auto text-3xl font-bold leading-none" href="/">
                            <svg className="h-10" viewBox="0 0 10240 10240">
                                <path xmlns="http://www.w3.org/2000/svg" d="M8284 9162 c-2 -207 -55 -427 -161 -667 -147 -333 -404 -644 -733 -886 -81 -59 -247 -169 -256 -169 -3 0 -18 -9 -34 -20 -26 -19 -344 -180 -354 -180 -3 0 -29 -11 -58 -24 -227 -101 -642 -225 -973 -290 -125 -25 -397 -70 -480 -80 -22 -3 -76 -9 -120 -15 -100 -13 -142 -17 -357 -36 -29 -2 -98 -7 -153 -10 -267 -15 -436 -28 -525 -40 -14 -2 -45 -7 -70 -10 -59 -8 -99 -14 -130 -20 -14 -3 -41 -7 -60 -11 -19 -3 -39 -7 -45 -8 -5 -2 -28 -6 -50 -10 -234 -45 -617 -165 -822 -257 -23 -10 -45 -19 -48 -19 -7 0 -284 -138 -340 -170 -631 -355 -1107 -842 -1402 -1432 -159 -320 -251 -633 -308 -1056 -26 -190 -27 -635 -1 -832 3 -19 7 -59 10 -89 4 -30 11 -84 17 -120 6 -36 12 -77 14 -91 7 -43 33 -174 39 -190 3 -8 7 -28 9 -45 6 -35 52 -221 72 -285 7 -25 23 -79 35 -120 29 -99 118 -283 189 -389 67 -103 203 -244 286 -298 75 -49 178 -103 196 -103 16 0 27 16 77 110 124 231 304 529 485 800 82 124 153 227 157 230 3 3 28 36 54 74 116 167 384 497 546 671 148 160 448 450 560 542 14 12 54 45 90 75 88 73 219 172 313 238 42 29 77 57 77 62 0 5 -13 34 -29 66 -69 137 -149 405 -181 602 -7 41 -14 82 -15 90 -1 8 -6 46 -10 83 -3 37 -8 77 -10 88 -2 11 -7 65 -11 122 -3 56 -8 104 -9 107 -2 3 0 12 5 19 6 10 10 8 15 -10 10 -34 167 -346 228 -454 118 -210 319 -515 340 -515 4 0 40 18 80 40 230 128 521 255 787 343 118 40 336 102 395 113 28 5 53 11 105 23 25 5 59 12 75 15 17 3 41 8 55 11 34 7 274 43 335 50 152 18 372 29 565 29 194 0 481 -11 489 -19 2 -3 -3 -6 -12 -6 -9 -1 -20 -2 -24 -3 -33 -8 -73 -16 -98 -21 -61 -10 -264 -56 -390 -90 -649 -170 -1243 -437 -1770 -794 -60 -41 -121 -82 -134 -93 l-24 -18 124 -59 c109 -52 282 -116 404 -149 92 -26 192 -51 220 -55 17 -3 64 -12 105 -21 71 -14 151 -28 230 -41 19 -3 46 -7 60 -10 14 -2 45 -7 70 -10 25 -4 56 -8 70 -10 14 -2 53 -7 88 -10 35 -4 71 -8 81 -10 10 -2 51 -6 92 -9 101 -9 141 -14 147 -21 3 -3 -15 -5 -39 -6 -24 0 -52 -2 -62 -4 -21 -4 -139 -12 -307 -22 -242 -14 -700 -7 -880 13 -41 4 -187 27 -250 39 -125 23 -274 68 -373 111 -43 19 -81 34 -86 34 -4 0 -16 -8 -27 -17 -10 -10 -37 -33 -59 -52 -166 -141 -422 -395 -592 -586 -228 -257 -536 -672 -688 -925 -21 -36 -43 -66 -47 -68 -4 -2 -8 -7 -8 -11 0 -5 -24 -48 -54 -97 -156 -261 -493 -915 -480 -935 2 -3 47 -21 101 -38 54 -18 107 -36 118 -41 58 -25 458 -138 640 -181 118 -27 126 -29 155 -35 14 -2 45 -9 70 -14 66 -15 137 -28 300 -55 37 -7 248 -33 305 -39 28 -3 84 -9 125 -13 163 -16 792 -8 913 12 12 2 58 9 102 15 248 35 423 76 665 157 58 19 134 46 170 60 86 33 344 156 348 166 2 4 8 7 13 7 14 0 205 116 303 184 180 126 287 216 466 396 282 281 511 593 775 1055 43 75 178 347 225 455 100 227 236 602 286 790 59 220 95 364 120 485 6 28 45 245 50 275 2 14 7 41 10 60 3 19 8 49 10 65 2 17 6 46 9 65 15 100 35 262 40 335 3 39 8 89 10 112 22 225 33 803 21 1043 -3 41 -7 129 -11 195 -3 66 -8 136 -10 155 -2 19 -6 76 -10 125 -3 50 -8 101 -10 115 -2 14 -6 57 -10 95 -7 72 -12 113 -20 175 -2 19 -7 55 -10 80 -6 46 -43 295 -51 340 -2 14 -9 54 -15 90 -5 36 -16 97 -24 135 -8 39 -17 84 -20 100 -12 68 -18 97 -50 248 -19 87 -47 204 -61 260 -14 56 -27 109 -29 117 -30 147 -232 810 -253 832 -4 4 -7 -23 -8 -60z"></path>
                            </svg>
                        </Link>
                        <button onClick={closeDialog} className="navbar-close">
                            <svg className="h-6 w-6 text-gray-200 cursor-pointer hover:text-sky-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <ul>
                            <li className="mb-1">
                                <Link className="block p-4 text-sm font-semibold text-gray-200 hover:bg-blue-50 hover:text-cyan-300 rounded" href="/">Home</Link>
                            </li>
                            <li className="mb-1">
                                <Link className="block p-4 text-sm font-semibold text-gray-200 hover:bg-blue-50 hover:text-cyan-300 rounded" href="/">Sobre Nosotros</Link>
                            </li>
                            <li className="mb-1">
                                <Link className="block p-4 text-sm font-semibold text-gray-200 hover:bg-blue-50 hover:text-cyan-300 rounded" href="/contacto">Contacto</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-auto">
                        {!user.isSignedIn && <div className="pt-6">
                            <Link className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold  bg-gray-50 hover:bg-gray-100 rounded-xl" href="/login">Iniciar Sesión</Link>
                            <Link className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl" href="/registro">Registrarse</Link>
                        </div>}
                        {!!user.isSignedIn && <SignOutButton>
                            <button className="  py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200">Cerrar Sesion</button>
                        </SignOutButton>
                        }

                        <p className="my-4 text-xs text-center text-gray-200">
                            <span>Copyright © 2021</span>
                        </p>
                    </div>
                </nav>
            </dialog >
            <div className="w-full bg-[#032154] py-[9px]  text-white" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                        </div>
                        <div className="col-md-6 col-sm-6 flex justify-end">
                            <ul className="social_icon1 flex">
                                <li className="px-2"> Seguinos </li>
                                <li className="px-2">
                                    <a href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
                                        </svg>
                                    </a>
                                </li>
                                <li className="px-2">
                                    <a href="#">
                                        <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 50 50">
                                            <path d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z" />
                                        </svg>
                                    </a>
                                </li>
                                <li className="px-2">
                                    <a href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0,0,256,256" fill-rule="nonzero"><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(5.33333,5.33333)"><path d="M8.421,14h0.052v0c2.79,0 4.527,-2 4.527,-4.5c-0.052,-2.555 -1.737,-4.5 -4.474,-4.5c-2.737,0 -4.526,1.945 -4.526,4.5c0,2.5 1.736,4.5 4.421,4.5zM4,17h9v26h-9zM44,26.5c0,-5.247 -4.253,-9.5 -9.5,-9.5c-3.053,0 -5.762,1.446 -7.5,3.684v-3.684h-9v26h9v-15v0c0,-2.209 1.791,-4 4,-4c2.209,0 4,1.791 4,4v15h9c0,0 0,-15.045 0,-16.5z"></path></g></g></svg>
                                    </a>
                                </li>
                                <li className="px-2">
                                    <a href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0,0,256,256" width="50px" height="50px" fill-rule="nonzero"><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(5.12,5.12)"><path d="M12,3c-4.96,0 -9,4.04 -9,9v26c0,4.96 4.04,9 9,9h26c4.96,0 9,-4.04 9,-9v-26c0,-4.96 -4.04,-9 -9,-9zM38,8h3c0.55,0 1,0.45 1,1v3c0,0.55 -0.45,1 -1,1h-3c-0.55,0 -1,-0.45 -1,-1v-3c0,-0.55 0.45,-1 1,-1zM25,10c5.33,0 10.01969,2.8 12.67969,7h4.32031v20c0,2.76 -2.24,5 -5,5h-24c-2.76,0 -5,-2.24 -5,-5v-20h4.32031c2.66,-4.2 7.34969,-7 12.67969,-7zM25,12c-7.17,0 -13,5.83 -13,13c0,7.17 5.83,13 13,13c7.17,0 13,-5.83 13,-13c0,-7.17 -5.83,-13 -13,-13zM25,16c4.96,0 9,4.04 9,9c0,4.96 -4.04,9 -9,9c-4.96,0 -9,-4.04 -9,-9c0,-4.96 4.04,-9 9,-9z"></path></g></g></svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );
}

