import React from 'react'
import { api } from '~/utils/api'
import es from 'date-fns/locale/es';
import { format } from 'date-fns';
import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const locale = es
interface props {
    serviceRequestId: string
}
export default function CommentsServiceRequest({ serviceRequestId }: props) {
    const { data: getNumberOfComments } = api.comment.getNumberOfComments.useQuery({ serviceRequestId: serviceRequestId })
    const { data: requestComments, isLoading: comentsLoading } = api.comment.getAllByRequestId.useQuery({ serviceRequestId: serviceRequestId })
    console.log(getNumberOfComments)
    const rows = [], len = getNumberOfComments || 0;
    let i = 0
    while (++i <= len) rows.push(i);
    return (
        <div className='w-full '>
            <div className='flex flex-col gap-2'>
                {comentsLoading && rows.map((_row, i) => (
                    <Skeleton key={i} className='w-full h-20 bg-slate-500' />
                ))}
                {
                    requestComments && requestComments.map((comment) => (
                        <Card key={comment.id} className=' p-5'>
                            <div className='flex items-center space-x-2 font-semibold'>
                                <Avatar className="cursor-pointer" >
                                    <AvatarFallback><div className="animate-spin rounded-full  border-b-2 border-gray-900"></div></AvatarFallback>
                                    <AvatarImage src={comment.author.image_url || ""} />
                                </Avatar>
                                <h1>{comment.author.first_name} {comment.author.last_name}</h1>
                            </div>
                            <p>{comment.content}</p>
                            <p className='text-sm text-slate-400'>{format(comment.createdAt, "PPP", { locale })}</p>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}
