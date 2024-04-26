import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Check } from 'lucide-react'
import { DropdownMenuItem, DropdownMenuSeparator } from '../ui/dropdown-menu'
import { Skeleton } from '../ui/skeleton'
import { api } from '~/utils/api'
import NotificationItem from './NotificationItem'
import { trpc } from '~/utils/trpc'


interface Props {
    'data-state'?: string | undefined;
    notificationsNumber: number;
}

export default function NotificationsContent({ notificationsNumber, ...props }: Props) {
    const { data: notifications, isLoading } = api.notification.getAll.useQuery(undefined, {

    })
    const { mutate: markAllAsRead } = api.notification.markAllAsRead.useMutation()
    const utils = trpc.useUtils()
    const handelMarkAllAsRead = () => markAllAsRead(undefined, {
        onSuccess: () => {
            void utils.notification.countUnRead.invalidate()
            void utils.notification.getAll.invalidate()
        }
    })
    const rows = [], len = notificationsNumber;
    let i = 0
    while (++i <= len) rows.push(i);
    return (
        <Card className={"w-[calc(95vw)] h-[calc(70vh)] md:w-96 overflow-y-auto"} {...props}>
            <CardHeader className='p-4 pb-0'>
                <CardTitle>Notificaciones</CardTitle>
                <CardDescription>{`tienes ${notificationsNumber} notificaciones sin abrir`}</CardDescription>
                <Button onClick={handelMarkAllAsRead} className="w-full">
                    <Check className="mr-2 h-4 w-4" /> Marcar todos como leido
                </Button>
            </CardHeader>
            <CardContent className="grid gap-2 px-2 w-full ">

                <div>
                    <DropdownMenuSeparator className='mt-3  bg-slate-900/30' />
                    {isLoading && rows.map((_row, i) => (
                        <DropdownMenuItem key={i}>
                            <Skeleton className="bg-slate-500 w-full h-10" />
                        </DropdownMenuItem>
                    ))
                    }
                    {notifications && notifications.map((notification) => (
                        <DropdownMenuItem
                            key={notification.id}
                            className="mb-4  grid grid-cols-[15px_8fr_1fr] items-start  p-2 last:mb-0  hover:bg-slate-300"
                        >
                            <NotificationItem notification={notification} />

                        </DropdownMenuItem>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}
