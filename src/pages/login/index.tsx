import { SignIn } from "@clerk/nextjs";
import { type MyPage } from "~/components/types/types";

const Page: MyPage = () => {
    return <SignIn afterSignInUrl="/perfil" afterSignUpUrl={"/registro/authenticated"} />;
}


export default Page;
Page.Layout = "Auth";