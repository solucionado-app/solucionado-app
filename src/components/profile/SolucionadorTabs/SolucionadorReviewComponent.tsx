
import Rating from "@mui/material/Rating";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getDateAsTwitterFormat } from "~/helpers/date";

interface Props {
    review: {
        id: string;
        content: string | null;
        createdAt: Date;
        rating: number;
        author: {
            first_name: string | null;
            last_name: string | null;
            image_url: string | null;
        }
        service: {
            category: {
                name: string;
            }
        }
    }
}

export default function SolucionadorReviewComponent({ review }: Props) {
    return (
        <>
            <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={review.author.image_url || ""} />
                    <AvatarFallback className="flex items-center justify-center">
                        <div className="animate-spin rounded-full  border-b-2 border-gray-900"></div>
                    </AvatarFallback>
                </Avatar>

                <h2 className="text-sm font-bold tracking-tight sm:text-lg">
                    {review.author.first_name && review.author.last_name
                        ? `${review.author.first_name} ${review.author.last_name}`
                        : "Usuario"}
                </h2>
            </div>
            <Rating
                name="hover-feedback"
                value={review?.rating}
                precision={0.5}
                readOnly={true}
                emptyIcon={<Star style={{ opacity: 0.4 }} fontSize="inherit" />}
            />
            <p className="text-xs font-medium text-gray-500 sm:text-sm ">
                {review.content}
            </p>
            <div className="flex w-full justify-end">
                <span className="text-xs text-gray-500">
                    {getDateAsTwitterFormat(review.createdAt)}
                </span>
            </div>
        </>
    )
}
