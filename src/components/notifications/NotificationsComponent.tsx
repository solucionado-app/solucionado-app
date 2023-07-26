/* eslint-disable @typescript-eslint/no-unsafe-argument */

import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { api } from "~/utils/api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { cn } from "~/lib/utils";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { formatDistance, subDays } from 'date-fns';
import es from 'date-fns/locale/es';


/* ---------ejemplo------ */
const distance = formatDistance(subDays(
    new Date(), 1),
    new Date(),
    { addSuffix: true, locale: es },
)

const notif = [
    {
      title: "Tu presupuesto ha sido conformado",
      description: distance
    },
    {
      title: "Tienes un nuevo mensaje",
      description: distance
    },
    {
      title: "tienes una nueva solicitud de servicio",
      description: distance
    },
  ]
  /* ---------end ejemplo------ */

  type CardProps = React.ComponentProps<typeof Card>

const NotificationsPage = ({ className, ...props }: CardProps) => {
    const { data: notifications, isLoading } = api.notification.getAll.useQuery()
    console.log("notifications", notifications)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><svg className="fill-white w-6 h-6 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" /></svg></DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-none border-none bg-transparent pr-5">
                <Card className={cn("w-[380px] ", className)} {...props}>
                    <CardHeader>
                        <CardTitle>Notificaciones</CardTitle>
                        <CardDescription>tienes 3 notificaciones sin abrir</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {/* <div className=" flex items-center space-x-4 rounded-md border p-4">
                            <BellRing />
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">
                                Push Notifications
                                </p>
                                <p className="text-sm text-muted-foreground">
                                Send notifications to device.
                                </p>
                            </div>
                            <Switch />
                        </div> */}
                        <div>
                            <DropdownMenuSeparator />
                            {isLoading && <DropdownMenuItem>Cargando...</DropdownMenuItem>}
                            {notifications?.map((notification) => (
                                <Link href={notification.link ? notification.link : "#"} key={notification.id}>
                                    <DropdownMenuItem >{notification.content}</DropdownMenuItem>
                                </Link>
                            ))}

                            {/* -----ejemplo----- */}
                            {notif.map((notif, index) => (
                                <div
                                key={index}
                                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-1 last:mb-0 last:pb-0"
                                >
                                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {notif.title}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {notif.description}
                                        </p>
                                    </div>
                                    
                                </div>
                            ))}
                            {/* -----ejemplo----- */}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">
                        <Check className="mr-2 h-4 w-4" /> Marcar todos como leido
                        </Button>
                    </CardFooter>
                </Card>
            </DropdownMenuContent>
        </DropdownMenu>
        

    );
};

export default NotificationsPage;