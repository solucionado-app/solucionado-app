import Link from "next/link";
import React from "react";
import { type MyPage } from "~/components/types/types";

// HomePage.Layout = "OtherLayout"; -> error Type '"OtherLayout"' is not assignable to type '"Main" | "Admin" | undefined'.
const NotFound: MyPage = () => {

    return (
        <>
            <div className="grid place-content-center h-screen">
                <div className="container mx-auto max-w-md text-center">
                    <h1 className="text-4xl font-bold text-zinc-700 my-4">
                        404 - Page Not Found
                    </h1>
                    <p className="text-zinc-400">
                        Sorry, we could not find the page you are looking for. Instead, here
                        are some similar pages that could help:
                    </p>
                    {/*TODO: List similar pages here */}
                    {/*TODO: Create Search bar component here */}
                    <div className="border border-b-gray-50 my-4"></div>
                    {/* Add navigation to important pages */}
                    <div>
                        <Link
                            className="hover:underline hover:text-indigo-400 text-indigo-500"
                            href="/"
                        >
                            Go to Home Page
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotFound;
NotFound.Layout = "Main";