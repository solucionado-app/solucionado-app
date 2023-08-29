import { Ban } from "lucide-react";
import React from "react";
import { CommentSkeleton } from "~/components/comments/CommentSkeleton";
import { TabsContent } from "~/components/ui/tabs";
import { api } from "~/utils/api";
import SolucionadorReviewComponent from "./SolucionadorReviewComponent";

type ReviewsTabProps = {
  userId: string;
};

const ReviewsTab: React.FC<ReviewsTabProps> = ({ userId }) => {
  const { data: reviews, status } = api.review.getAllByUserId.useQuery({
    userId,
  });
  if (!reviews) {
    return (
      <div className="flex w-full max-w-6xl flex-col justify-center p-4">
        <div className="flex min-h-[20rem] w-full items-center justify-center bg-slate-200">
          {status === "error" ? (
            <div className="flex w-full flex-col items-center justify-center">
              <Ban className="h-16 w-16 text-red-500" />
              <h2 className="text-2xl font-bold tracking-tighter">
                Algo salió mal
              </h2>
              <p>No se pudieron cargar las reseñas. Inténtelo de nuevo</p>
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
    <TabsContent value="reviews" className="px-2">
      {
        reviews.map((review) => {
          const { rating } = review;
          const newreview = { ...review, rating: Number(rating) }
          return (
            <div
              className="flex w-full flex-col gap-2 rounded border border-gray-200 bg-white p-4"
              key={review.id}
            >
              <SolucionadorReviewComponent review={newreview} />

            </div>
          )
        })
      }
    </TabsContent>
  );
};

export default ReviewsTab;
