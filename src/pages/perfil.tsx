import React from 'react'
import PropTypes from 'prop-types'
import { type MyPage } from "~/components/types/types";
import { RedirectToSignIn, SignedIn, SignedOut, UserProfile } from '@clerk/nextjs';


export default function MyProfile(props: MyPage) {
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

