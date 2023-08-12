import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Link from "next/link";
type AvatarSolucionadorProps = {
  image: string;
  userId: string;
};
export const AvatarSolucionador: React.FC<AvatarSolucionadorProps> = ({
  image,
  userId,
}) => {
  return (
    <Link href={`/solucionador/${userId}`}>
      <Avatar>
        <AvatarImage src={image} alt="User Image" />
        <AvatarFallback></AvatarFallback>
      </Avatar>
    </Link>
  );
};
