import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { type MyPage } from "~/components/types/types";

const Page: MyPage = () => {
    const router = useRouter()
    const { redirect, ...rest } = router.query
    const params = new URLSearchParams(rest as Record<string, string>);

    const url = redirect as string + "?" + params.toString();
    console.log(url);
    return <SignIn afterSignInUrl={Object.keys(router.query).length && redirect ? url : "/perfil"}
        afterSignUpUrl={Object.keys(router.query).length && redirect ? redirect as string : "/completar-perfil"} />;
}


export default Page;
Page.Layout = "Auth";