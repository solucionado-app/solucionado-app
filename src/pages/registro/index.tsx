import { SignUp } from "@clerk/nextjs";
import { type MyPage } from "~/components/types/types";


const Page: MyPage = () => {
    return <SignUp />;
}


export default Page;
Page.Layout = "Auth";