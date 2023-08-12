import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { api } from "~/utils/api";
const DynamicDescriptionTab = dynamic(
  () => import("../SolucionadorTabs/descriptionTab"),
  { loading: () => <Loader2 className="h-12 w-12 animate-spin" /> }
);
const DynamicReviewsTab = dynamic(
  () => import("../SolucionadorTabs/reviewsTab"),
  { loading: () => <Loader2 className="h-12 w-12 animate-spin" /> }
);
const DynamicCommentsTab = dynamic(
  () => import("../SolucionadorTabs/commentsTab"),
  { loading: () => <Loader2 className="h-12 w-12 animate-spin" /> }
);

type SolucionadorTabsProps = {
  userId: string;
};
export const SolucionadorTabs: React.FC<SolucionadorTabsProps> = ({
  userId,
}) => {
  const { data: commentsCount } = api.comment.getNumberOfCommentsUser.useQuery({
    userId,
  });
  const { data: reviewsCount } = api.review.getNumberOfReviewsUser.useQuery({
    userId,
  });

  return (
    <Tabs defaultValue="description ">
      <TabsList className="w-full">
        <TabsTrigger className="w-full text-xs sm:text-sm" value="description">
          Descripción
        </TabsTrigger>
        <TabsTrigger className="w-full text-xs sm:text-sm" value="reviews">
          Reseñas ({reviewsCount && `${reviewsCount}`})
        </TabsTrigger>
        <TabsTrigger className="w-full text-xs sm:text-sm" value="comments">
          Comentarios ({commentsCount && `${commentsCount}`})
        </TabsTrigger>
      </TabsList>
      <DynamicDescriptionTab />
      <DynamicReviewsTab userId={userId} />
      <DynamicCommentsTab userId={userId} />
    </Tabs>
  );
};
