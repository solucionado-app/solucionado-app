import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
type Props = {
  children: React.ReactNode;
};

const ProfileDropdown = ({ children }: Props) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {" "}
          <Link
            className={`text-sm ${
              router.asPath === "/perfil"
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
            className={`text-sm ${
              router.asPath === "/completar-perfil"
                ? "font-semibold text-sol_lightBlue"
                : ""
            }`}
            href="/completar-perfil"
          >
            Completar Perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SignedIn>
            <Link
              className={`text-sm ${
                router.asPath === "/solicitudes-de-servicio"
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
  );
};

export default ProfileDropdown;
