import { Ban, User2 } from "lucide-react";
import React from "react";
import { CommentProfileForm } from "~/components/comments/CommentProfileForm";
import { CommentSkeleton } from "~/components/comments/CommentSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { TabsContent } from "~/components/ui/tabs";
import { getDateAsTwitterFormat } from "~/helpers/date";
import { api } from "~/utils/api";

type CommentsTabsProps = {
  userId: string;
};

const CommentsTab: React.FC<CommentsTabsProps> = ({ userId }) => {
  const { data: comments, status } = api.comment.getAllByUserId.useQuery({
    userId,
  });
  if (!comments) {
    return (
      <div className="flex w-full max-w-6xl flex-col justify-center p-4">
        <div className="flex min-h-[20rem] w-full items-center justify-center bg-slate-200">
          {status === "error" ? (
            <div className="flex w-full flex-col items-center justify-center">
              <Ban className="h-16 w-16 text-red-500" />
              <h2 className="text-2xl font-bold tracking-tighter">
                Algo salió mal
              </h2>
              <p>No se pudieron cargar los comentarios. Inténtelo de nuevo</p>
            </div>
          ) : (
            <div className="flex w-full flex-col gap-2">
              <CommentSkeleton />
              <CommentSkeleton />
              <CommentSkeleton />
              <CommentSkeleton />
              <CommentSkeleton />
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <TabsContent
      value="comments"
      className="flex flex-col gap-2 space-y-3 px-2"
    >
      <CommentProfileForm userId={userId} />
      {comments.map((comment) => (
        <div
          className="flex w-full flex-col gap-2 rounded border border-gray-200 bg-white p-4"
          key={comment.id}
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.author.image_url || ""} />
              <AvatarFallback className="flex items-center justify-center">
                <User2 className="h-10 w-10 bg-gray-200 text-solBlue" />
              </AvatarFallback>
            </Avatar>

            <h2 className="text-sm font-bold tracking-tight sm:text-lg">
              {comment.author.first_name && comment.author.last_name
                ? `${comment.author.first_name} ${comment.author.last_name}`
                : "Usuario"}
            </h2>
          </div>
          <p className="text-xs font-medium text-gray-500 sm:text-sm ">
            {comment.content}
          </p>
          <div className="flex w-full justify-end">
            <span className="text-xs text-gray-500">
              {getDateAsTwitterFormat(comment.createdAt)}
            </span>
          </div>
        </div>
      ))}
    </TabsContent>
  );
};

export default CommentsTab;
