
import { type MyPage } from "~/components/types/types";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { ProfileData } from "~/components/auth/ProfileData";

const MyProfile: MyPage = () => {

  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center">
      <SignedIn>
        <div className="flex w-full max-w-7xl flex-col items-center">
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
MyProfile.Title = "Perfil";
MyProfile.Description = "perfil";

export default MyProfile;
