import React from "react";
import { Card } from "../ui/card";
import { useUser } from "@clerk/nextjs";
import { getDateAsTwitterFormat } from "~/helpers/date";

interface Author {
  id: string;
  first_name: string | null;
  last_name: string | null;
  image_url: string | null;
}
interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  author: Author;
}
interface Props {
  comment: Comment;
}

export default function ServiceMessage({ comment }: Props) {
  const { user } = useUser();
  const own = user?.id === comment?.author?.id;

  return (
    <Card
      key={comment.id}
      id={comment.id}
      className={`flex gap-2 bg-transparent  ${own ? "items-end justify-end " : ""
        } border-none p-2  shadow-none`}
    >
      <div
        className={`${own ? "bg-blue-200" : "bg-emerald-300"
          } rounded-xl px-4 py-2.5`}
      >
        <div className="flex flex-col items-start font-semibold">
          {/* {!own && (
            <Link href={`/solucionador/${comment.author.id}`}>
              <Avatar className="h-10 w-10 cursor-pointer">
                <AvatarImage src={comment.author.image_url || ""} />
                <AvatarFallback>
                  <div className="animate-spin rounded-full  border-b-2 border-gray-900"></div>
                </AvatarFallback>
              </Avatar>
            </Link>
          )} */}
        </div>
        <div className="flex flex-col">
          {" "}
          <p className="text-sm font-normal text-black">{comment.content}</p>
          <span className="text-sm font-light text-gray-600">
            {getDateAsTwitterFormat(comment.createdAt)}
          </span>
        </div>
      </div>
    </Card>
  );
}
