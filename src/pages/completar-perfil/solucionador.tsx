import { RegisterSolucionadorUser } from "@/src/components/auth/RegisterSolucionadorUser";
import { type MyPage } from "~/components/types/types";

const Page: MyPage = () => {

    return <div className="h-screen flex items-center">

        <RegisterSolucionadorUser />
    </div>;
}


export default Page;
Page.Layout = "Auth";
Page.Title = "Registratse";
Page.Description = "Registratse en solucionado";