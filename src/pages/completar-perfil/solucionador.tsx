import { RegisterSolucionadorUser } from "@/src/components/auth/RegisterSolucionadorUser";
import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { type MyPage } from "~/components/types/types";

const Page: MyPage = () => {
    const router = useRouter()
    const { redirect } = router.query
    console.log(router.query)
    return <div className="h-screen flex items-center">

        <RegisterSolucionadorUser />
    </div>;
}


export default Page;
Page.Layout = "Auth";
Page.Title = "Registratse";
Page.Description = "Registratse en solucionado";