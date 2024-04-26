
import { FormStepsProvider } from "@/src/components/auth/FormSolucionador/ContextSolucionadorForm";
import MainForm from "@/src/components/auth/FormSolucionador/MainForm";
import { type MyPage } from "~/components/types/types";

const Page: MyPage = () => {
    return <div className="h-screen flex flex-col items-center">
        <h1 className="text-4xl font-bold text-zinc-700 my-4">
            Completa tus datos
        </h1>
        {/* <RegisterSolucionadorUser /> */}
        <FormStepsProvider>
            <MainForm />
        </FormStepsProvider>
    </div>;
}


export default Page;
Page.Layout = "Auth";
Page.Title = "Registrarse";
Page.Description = "Registrate en solucionado";
