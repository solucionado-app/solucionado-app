import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
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
      className={`flex gap-2 bg-transparent  ${
        own ? "items-end justify-end " : ""
      } border-none  p-5 shadow-none`}
    >
      <div
        className={`${
          own ? "bg-blue-200" : "bg-emerald-300"
        } rounded-full px-8 py-2`}
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
          <p className="text-sm font-semibold text-black">{comment.content}</p>
          <p className="text-sm  text-gray-600">
            {getDateAsTwitterFormat(comment.createdAt)}
          </p>
        </div>
      </div>
    </Card>
  );
}
