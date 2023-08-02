import React from "react";
import { type MyPage } from "~/components/types/types";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserProfile,
  useUser,
} from "@clerk/nextjs";
import { api } from "~/utils/api";
import { RegisterUser } from "~/components/auth/RegisterUser";
import { ProfileData } from "~/components/auth/ProfileData";

const MyProfile: MyPage = () => {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center">
      <SignedIn>
        <div className="flex w-full max-w-7xl flex-col items-center">
          <div className="m-4 flex w-full justify-start">
            <h2 className="text-center text-2xl font-bold text-gray-500">
              Mis Datos
            </h2>
          </div>
          <ProfileData />
        </div>
        {/* <UserProfile /> */}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn redirectUrl={"/login"} />
      </SignedOut>
    </div>
  );
};

MyProfile.Layout = "Main";

export default MyProfile;
