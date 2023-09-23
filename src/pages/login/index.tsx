import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { type MyPage } from "~/components/types/types";

const Page: MyPage = () => {
    const router = useRouter()
    const { redirect } = router.query
    console.log(router.query)
    return <div className="h-full flex items-center">
        <SignIn
            signUpUrl="/registro"
            path="/login"
            afterSignInUrl={!!redirect && typeof redirect === 'string' && redirect !== '' ? redirect : "/perfil"}
            afterSignUpUrl={!!redirect && typeof redirect === 'string' && redirect !== '' ? redirect : "/completar-perfil"}
        />
    </div>;
}


export default Page;
Page.Layout = "Main";
Page.Title = "Login";
Page.Description = "login";
