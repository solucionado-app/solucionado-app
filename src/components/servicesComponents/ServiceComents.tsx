import React from 'react'
import { api } from '~/utils/api'

import { Skeleton } from '../ui/skeleton';
import ServiceMessage from './ServiceMessage';

interface props {
    serviceId: string
}
export default function CommentsServiceRequest({ serviceId }: props) {
    const { data: getNumberOfComments } = api.comment.getNumberOfCommentsService.useQuery({ serviceId: serviceId })
    const { data: requestComments, isLoading: comentsLoading } = api.comment.getAllByServiceId.useQuery({ serviceId: serviceId })
    // console.log(getNumberOfComments)
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
                        <ServiceMessage key={comment.id} comment={comment} />
                    ))
                }
            </div>
        </div>
    )
}
