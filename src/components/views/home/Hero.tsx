import { type CategoriesQueryResponse } from "~/components/types/common";

import Spinner from "~/components/ui/spinner";
import Background from "./Background";
import HomeSelect from "~/components/formularios/HomeSelect";


interface Props {
  categories: CategoriesQueryResponse[] | undefined;
  isLoading: boolean;
}
export default function Hero({ categories, isLoading }: Props) {

  return (
    <>
      <section className="relative banner_main flex min-hscreen h-screen w-full flex-col justify-center z-10  px-6 pt-28 md:px-12 md:pt-0  ">
        {/* <div className="flex w-full items-center justify-center md:w-8/12 md:justify-between"> */}
        <Background />
        <div className=" flex flex-col items-start gap-2 py-5  md:w-8/12 md:gap-5 md:text-start ">
          <h1 className="pb-2 text-start text-4xl font-semibold text-white  shadow-black drop-shadow-xl sm:text-5xl md:py-5  md:text-start md:text-6xl  ">
            Conectamos problemas con soluciones: <span> Tu hogar,</span>{" "}
            <span className="animate-bg-animation bg-gradient-to-r   from-solYellow via-turquesa  to-sol_lightBlue bg-[500%,500%] bg-clip-text bg-no-repeat font-bold text-transparent">
              Solucionado.
            </span>
          </h1>

          {isLoading && <Spinner className="h-12 w-12 text-solBlue" />}
          {categories && (
            <>
              <HomeSelect categories={categories} isLoading={isLoading} />
            </>
          )}
        </div>

      </section>


    </>
  );
}

