"use client"

import { SignOutButton, SignedIn, useUser } from "@clerk/nextjs";
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
  const {user} = useUser();
  const userMetadata = user?.unsafeMetadata;
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
          {!userMetadata?.completedProfile && <DropdownMenuItem>
            <Link
              className={`text-sm ${pathName === "/completar-perfil"
                ? "font-semibold text-sol_lightBlue"
                : ""
                }`}
              href="/registro/solucionador/completar-perfil"
            >
              Completar Perfil
            </Link>
          </DropdownMenuItem>}
          <DropdownMenuItem>
            <Link
              className={`text-sm ${pathName === "/servicios"
                ? "font-semibold text-sol_lightBlue"
                : ""
                }`}
              href="/servicios"
            >
              Servicios contratados
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
                Mis solicitudes de Servicio
              </Link>
            </SignedIn>
          </DropdownMenuItem>
          <DropdownMenuLabel>Solucionador</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {userMetadata?.role === "SOLUCIONADOR" && <DropdownMenuItem>
            <Link
              className={`text-sm ${pathName === "/servicios/solucionador"
                ? "font-semibold text-sol_lightBlue"
                : ""
                }`}
              href="/servicios/solucionador"
            >
              Servicios como solucionador
            </Link>
          </DropdownMenuItem>}

          {userMetadata?.role === "SOLUCIONADOR" && <DropdownMenuItem>
              <Link
              className={`text-sm ${pathName === "/solucionador/solicitudes-de-servicio"
                  ? "font-semibold text-sol_lightBlue"
                  : ""
                  }`}
                href="/solucionador/solicitudes-de-servicio"
              >
                Solicitudes en la zona
              </Link>
          </DropdownMenuItem>
    }
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutButton>Cerrar Sesion</SignOutButton>{" "}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
};

export default ProfileDropdown;
