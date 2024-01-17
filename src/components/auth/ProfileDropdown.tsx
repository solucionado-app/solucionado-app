"use client"

import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Dialog } from "../ui/dialog";
type Props = {
  children: React.ReactNode;
};

const ProfileDropdown = ({ children }: Props) => {
  const pathName = usePathname();
  console.log(pathName);

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="lg:mr-8">
          <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            {" "}
            <Link
              className={`text-sm ${pathName === "/perfil"
                ? "font-semibold text-sol_lightBlue"
                : ""
                }`}
              href="/perfil"
            >
              Mi Perfil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className={`text-sm ${pathName === "/completar-perfil"
                ? "font-semibold text-sol_lightBlue"
                : ""
                }`}
              href="/registro/solucionador/completar-perfil"
            >
              Completar Perfil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className={`text-sm ${pathName === "/servicios"
                ? "font-semibold text-sol_lightBlue"
                : ""
                }`}
              href="/servicios"
            >
              Mis servicios
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignedIn>
              <Link
                className={`text-sm ${pathName === "/solicitudes-de-servicio"
                  ? "font-semibold text-sol_lightBlue"
                  : ""
                  }`}
                href="/solicitudes-de-servicio"
              >
                Solicitudes de Servicio
              </Link>
            </SignedIn>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignOutButton>Cerrar Sesion</SignOutButton>{" "}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
};

export default ProfileDropdown;
