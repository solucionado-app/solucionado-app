
import { SignOutButton } from "@clerk/nextjs";
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
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem><SignOutButton >Cerrar Sesion</SignOutButton> </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileDropdown;