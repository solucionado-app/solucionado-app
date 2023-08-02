import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { type MyPage } from "~/components/types/types";

const Page: MyPage = () => {
    const router = useRouter()
    const { redirect } = router.query

    return <SignIn afterSignInUrl={!!redirect ? redirect as string : "/perfil"}
        afterSignUpUrl={!!redirect ? redirect as string : "/completar-perfil"} />;
}


export default Page;
Page.Layout = "Auth";