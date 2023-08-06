/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Ban, Loader2 } from "lucide-react";
import type { SignedInAuthObject } from "@clerk/nextjs/dist/types/server";
import type { GetStaticPaths, GetStaticPropsContext } from "next";
import type { JwtPayload, ServerGetTokenOptions } from "@clerk/types";
import React from "react";
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
      <div className="flex w-full max-w-6xl flex-col justify-center p-4">
        {/* Card User */}
        <SolucionadorProfileCard profile={profile} />
        {/* Tabs */}
        <SolucionadorTabs />
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
  const auth: SignedInAuthObject = {
    sessionId: "123",
    session: undefined,
    actor: undefined,
    userId: "123",
    user: undefined,
    orgId: undefined,
    orgRole: undefined,
    orgSlug: undefined,
    sessionClaims: {} as JwtPayload,
    organization: undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getToken: function (): Promise<string | null> {
      throw new Error("Function not implemented.");
    },
    debug: function (): unknown {
      throw new Error("Function not implemented.");
    },
  };
  const ssg = ssgHelper(auth);
  await ssg.user.getSolucionadorProfileInfoById.prefetch({ id });
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
}
