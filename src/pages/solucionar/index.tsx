import About from "@/src/components/views/home/About";
import { api } from "@/src/utils/api";
import { type MyPage } from "~/components/types/types";
import ContactForm from "~/components/views/contact/ContactForm";

const Categorias: MyPage = () => {
    const apitrcp = api.categories.getAll.useQuery();
    const { data: categories, isLoading } = apitrcp;

    return (
        <>
            <main className="flex min-h-screen bg-gray-200 flex-col items-center justify-center ">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                    <About categories={categories} isLoading={isLoading} />

                </div>
            </main>
        </>
    );
};
export default Categorias;
Categorias.Layout = "Main";
Categorias.Title = "Categorias";
Categorias.Description = "Categorias";