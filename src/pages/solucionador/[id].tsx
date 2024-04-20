/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Ban, Loader2 } from "lucide-react";
import type { GetStaticPaths, GetStaticPropsContext } from "next";

import { SolucionadorProfileCard } from "~/components/profile/SolucionadorProfileCard";
import { SolucionadorTabs } from "~/components/profile/SolucionadorTabs";
import { ssgHelper } from "~/server/api/ssgHelper";
import { api } from "~/utils/api";
interface Props {
  id: string;
}
const SolucionadorProfilePage = ({ id }: Props) => {
  const { data: profile, status } =
    api.user.getSolucionadorProfileInfoById.useQuery({
      id,
    });
  if (!profile) {
    return (
      <div className="flex w-full max-w-6xl flex-col justify-center p-4">
        <div className="flex min-h-[20rem] w-full items-center justify-center bg-slate-200">
          {status === "error" ? (
            <div className="flex w-full flex-col items-center justify-center">
              <Ban className="h-16 w-16 text-red-500" />
              <h2 className="text-2xl font-bold tracking-tighter">
                Algo salió mal
              </h2>
              <p>No se pudo cargar el perfil. Inténtelo de nuevo</p>
            </div>
          ) : (
            <Loader2 className="h-12 w-12 animate-spin" />
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full max-w-6xl flex-col justify-center gap-2 p-4">
        {/* Card User */}
       {!!profile.user && <SolucionadorProfileCard profile={profile.user} countReviews={profile.countReviews} average={profile.rating} />}
        {/* Tabs */}
        <SolucionadorTabs userId={id} />
      </div>
    </div>
  );
};

export default SolucionadorProfilePage;
SolucionadorProfilePage.Layout = "Main";

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const id = context?.params?.id;

  if (id == null) {
    return {
      redirect: {
        destination: "/404",
      },
    };
  }

  const ssg = ssgHelper(undefined);
  await ssg.user.getSolucionadorProfileInfoById.prefetch({ id });
  await ssg.comment.getNumberOfCommentsUser.prefetch({ userId: id });
  await ssg.review.getNumberOfReviewsUser.prefetch({ userId: id });
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
}
