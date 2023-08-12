import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Card } from '../ui/card'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useUser } from '@clerk/nextjs'

interface Author {
    id: string
    first_name: string | null
    last_name: string | null
    image_url: string | null
}
interface Comment {
    id: string
    content: string;
    createdAt: Date;
    author: Author;
}
interface Props {
    comment: Comment
}

export default function ServiceMessage({ comment }: Props) {
    const { user } = useUser()
    const own = user?.id === comment?.author?.id

    return (

        <Card key={comment.id} id={comment.id} className={`flex flex-col  ${own ? 'justify-end items-end' : ''} p-5`}>
            <div className='flex flex-col items-start  font-semibold'>
                {!own && <Avatar className="cursor-pointer h-7 w-7" >
                    <AvatarFallback><div className="animate-spin rounded-full  border-b-2 border-gray-900"></div></AvatarFallback>
                    <AvatarImage src={comment.author.image_url || ""} />
                </Avatar>}

            </div>
            <p>{comment.content}</p>
            <p className='text-sm text-slate-400'>{format(comment.createdAt, "PPP", { locale: es })}</p>
        </Card>
    )
}
