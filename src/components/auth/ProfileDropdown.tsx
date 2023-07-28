
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
} from "~/components/ui/dropdown-menu"
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
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>
                    <SignedIn>
                    <Link className={`text-sm ${router.asPath === "/completar-perfil" ? "text-cyan-300 font-semibold" : ""}`} href="/completar-perfil">Completar Perfil</Link>
                    </SignedIn>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <SignedIn>
                        <Link className={`text-sm ${router.asPath === "/solicitudes-de-servicio" ? "text-cyan-300 font-semibold" : ""}`} href="/solicitudes-de-servicio">Solicitudes de Servicio</Link>
                    </SignedIn>
                </DropdownMenuItem>
                <DropdownMenuItem><SignOutButton >Cerrar Sesion</SignOutButton> </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileDropdown;