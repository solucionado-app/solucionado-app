import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
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
export const SolucionadorTabs = () => {
  return (
    <Tabs defaultValue="description">
      <TabsList className="w-full">
        <TabsTrigger className="w-full" value="description">
          Descripción
        </TabsTrigger>
        <TabsTrigger className="w-full" value="reviews">
          Opiniones / Reseñas
        </TabsTrigger>
        <TabsTrigger className="w-full" value="comments">
          Comentarios
        </TabsTrigger>
      </TabsList>
      <DynamicDescriptionTab />
      <DynamicReviewsTab />
      <DynamicCommentsTab />
    </Tabs>
  );
};
