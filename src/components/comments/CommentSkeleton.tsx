import React from "react";
import { Skeleton } from "../ui/skeleton";

export const CommentSkeleton = () => {
  return (
    <Skeleton className="flex w-full flex-col gap-6 rounded border border-gray-200 bg-white p-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
        <Skeleton className="h-4 w-36 bg-gray-300" />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Skeleton className="h-4 w-full bg-gray-300" />
        <Skeleton className="h-4 w-full bg-gray-300" />
        <Skeleton className="h-4 w-full bg-gray-300" />
      </div>
    </Skeleton>
  );
};
