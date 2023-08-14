import React from "react";
import { api } from "~/utils/api";

import { Skeleton } from "../ui/skeleton";
import ServiceMessage from "./ServiceMessage";
import Spinner from "../ui/spinner";

interface props {
  serviceId: string;
}
export default function CommentsServiceRequest({ serviceId }: props) {
  const { data: getNumberOfComments } =
    api.comment.getNumberOfCommentsService.useQuery({ serviceId: serviceId });
  const { data: requestComments, isLoading: comentsLoading } =
    api.comment.getAllByServiceId.useQuery({ serviceId: serviceId });
  const rows = [],
    len = getNumberOfComments || 0;
  let i = 0;
  while (++i <= len) rows.push(i);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        {comentsLoading &&
          rows.map((_row, i) => (
            <Skeleton key={i} className="h-12 w-36 bg-slate-200" />
          ))}
        {requestComments &&
          requestComments.map((comment) => (
            <ServiceMessage key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
}
