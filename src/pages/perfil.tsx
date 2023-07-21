import React from 'react'
import { type MyPage } from "~/components/types/types";
import { RedirectToSignIn, SignedIn, SignedOut, UserProfile } from '@clerk/nextjs';


const MyProfile: MyPage = () => {
    return (
        <div>
            <SignedIn>
                {/* Signed in users will see their user profile */}
                <UserProfile />
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn redirectUrl={"/login"} />
            </SignedOut>
        </div>
    )
}

MyProfile.Layout = "Main";

export default MyProfile