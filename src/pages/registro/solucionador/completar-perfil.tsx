import { RegisterSolucionadorUser } from "@/src/components/auth/RegisterSolucionadorUser";
import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { type MyPage } from "~/components/types/types";

const Page: MyPage = () => {
    const router = useRouter()
    const { redirect } = router.query
    console.log(router.query)
    return <div className="h-screen flex flex-col items-center">
        <h1 className="text-4xl font-bold text-zinc-700 my-4">
            Registrate como solucionador
        </h1>
        <RegisterSolucionadorUser />
    </div>;
}


export default Page;
Page.Layout = "Auth";
Page.Title = "Registrarse";
Page.Description = "Registrate en solucionado";
