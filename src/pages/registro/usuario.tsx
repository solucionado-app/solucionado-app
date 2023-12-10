import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { type MyPage } from "~/components/types/types";

const Page: MyPage = () => {
    const router = useRouter()
    const { redirect } = router.query
    console.log(router.query)
    return <div className="h-screen flex items-center">

        <SignUp
            signInUrl="/login"
            path="/registro/usuario"
            afterSignInUrl={!!redirect && typeof redirect === 'string' && redirect !== '' ? redirect : "/perfil"}
            afterSignUpUrl={!!redirect && typeof redirect === 'string' && redirect !== '' ? redirect : "/completar-perfil"}
        />
    </div>;
}


export default Page;
Page.Layout = "Auth";
Page.Title = "Registratse";
Page.Description = "Registratse en solucionado";
