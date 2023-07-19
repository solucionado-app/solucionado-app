import { type MyPage } from "~/components/types/types";

const Page: MyPage = () => {
    return (<>
        <div className="items-center w-full">
            <div className="w-full p-2 md:max-w-md md:mx-auto">
                <div className='flex flex-col justify-center text-orange-brand'>
                    <h2 className="flex justify-center text-5xl md:text-6xl font-bold leading-tighter mb-4">
                        <span className="bg-clip-text text-center text-transparent bg-gray-700  dark:bg-gray-100 py-2">
                            {'Completa los datos para registrarte'}
                        </span>
                    </h2>
                </div>
                {/* <RegisterCommonUser /> */}

            </div>
        </div >
    </>);
}


export default Page;
Page.Layout = "Auth";