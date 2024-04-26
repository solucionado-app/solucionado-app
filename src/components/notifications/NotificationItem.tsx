import { type Notification, type User } from '@prisma/client'
import { formatDistance } from 'date-fns'
import { es } from 'date-fns/locale'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { CheckCheck, Circle, MoreVertical, Trash2 } from 'lucide-react'
import { api } from '~/utils/api'
import { trpc } from '~/utils/trpc'
import { useRouter } from 'next/navigation'


interface NotficationItemProps extends Notification {
    readBy: User[]
}
interface Props {
    notification: NotficationItemProps
}
export default function NotificationItem({ notification }: Props) {
    const { mutate: markAsUnread } = api.notification.markAsUnread.useMutation()
    const { mutate: markAsRead } = api.notification.markAsRead.useMutation()
    const { mutate: deleteNotification } = api.notification.delete.useMutation()
    const utils = trpc.useUtils()
    const handleMarkAsUnread = () => {
        markAsUnread({
            notificationId: notification.id,
        }, {
            onSuccess: () => {
                void utils.notification.getAll.invalidate()
                void utils.notification.countUnRead.invalidate()
            }
        })
    }
    const router = useRouter()
    const handlemarkAsRead = () => {
        markAsRead({
            notificationId: notification.id,
        }, {
            onSuccess: () => {
                void utils.notification.getAll.invalidate()
                void utils.notification.countUnRead.invalidate()
            }
        })
    }
    const handleDeleteNotification = () => {
        deleteNotification({
            notificationId: notification.id,
        }, {
            onSuccess: () => {
                void utils.notification.getAll.invalidate()
                void utils.notification.countUnRead.invalidate()
            }
        })
    }
    return (
        <>
            {<span className={` ${notification.readBy?.length < 1 ? "flex" : "invisible"} h-2 w-2 translate-y-1 rounded-full bg-sky-500`} />}
            <div onClick={() => {
                handlemarkAsRead()
                void router.push(notification.link ? notification.link : "#")
            }} className={`space-y-1 cursor-pointer`}>
                <p className="text-sm font-medium leading-none">
                    {notification.content}
                </p>
                <p className="text-sm text-muted-foreground">
                    {formatDistance(notification.createdAt, new Date(), { addSuffix: true, locale: es })}
                </p>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger className='flex justify-center'>
                    <MoreVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent data-side='left' className='p-0 -right-1/2 w-[12.5rem]'>
                    {notification.readBy?.length < 1 ? <div onMouseDown={handlemarkAsRead} className="p-2 flex gap-2 cursor-pointer hover:bg-slate-300">
                        <CheckCheck />Marcar como leido
                    </div> :
                        <div onMouseDown={handleMarkAsUnread} className="p-2 flex gap-2 items-center cursor-pointer hover:bg-slate-300">
                            <Circle size={16} fill='#475569' color='#475569' />  Marcar como no leido
                        </div>}

                    <div onMouseDown={handleDeleteNotification} className="p-2 flex gap-2 cursor-pointer hover:bg-slate-300">
                        <Trash2 />  Eliminar
                    </div>

                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
