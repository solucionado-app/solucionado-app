import { Rating } from '@mui/material';
import { Star } from 'lucide-react';
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
interface props {
    user: {
        id: string;
        first_name: string | null;
        last_name: string | null;
        image_url: string | null;
    }
    rating: number
    count: number
}

export default function SolucionadorRating({ user, rating, count }: props) {
    return (
        <>
            <div className="flex items-center  gap-2">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={user.image_url || ""} />
                    <AvatarFallback className="flex items-center justify-center">
                        <div className="animate-spin rounded-full  border-b-2 border-gray-900"></div>
                    </AvatarFallback>
                </Avatar>

                <span className="text-sm font-medium tracking-tight sm:text-md">
                    {user.first_name && user.last_name
                        ? `${user.first_name} ${user.last_name}`
                        : "Usuario"}
                </span>
            </div>
            <div className="flex items-center  gap-2">
                <Rating
                    name="hover-feedback"
                    value={rating}
                    precision={0.5}
                    readOnly={true}
                    emptyIcon={<Star style={{ opacity: 0.4 }} fontSize="inherit" />}
                />
                {<span className="text-sm font-medium tracking-tight sm:text-md">
                    {count ? `(${count})` : "Sin reseñas"}
                </span>}
            </div>
        </>
    )
}
