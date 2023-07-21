import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { type MyPage } from "~/components/types/types";

const Page: MyPage = () => {
    const router = useRouter()
    const { redirect, ...rest } = router.query

    const u = new URLSearchParams(rest).toString();

    const url = redirect as string + "?" + u;
    console.log(url);
    return <SignIn afterSignInUrl={Object.keys(router.query).length ? url : "/perfil"} afterSignUpUrl={Object.keys(router.query).length ? redirect as string : "/completar-perfil"} />;
}


export default Page;
Page.Layout = "Auth";