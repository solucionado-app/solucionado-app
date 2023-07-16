import { SignIn } from "@clerk/nextjs";
import { type MyPage } from "~/components/types/types";

const Page: MyPage = () => {
    return <SignIn />;
}


export default Page;
Page.Layout = "Auth";