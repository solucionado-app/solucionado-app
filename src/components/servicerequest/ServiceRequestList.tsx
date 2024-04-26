// ServiceRequestList.tsx
import { api } from "~/utils/api";
import ServiceRequestCard from "./ServiceRequestCard";
import { Skeleton } from "../ui/skeleton";
import InfiniteScroll from "react-infinite-scroll-component";

const ServiceRequestList = () => {
    const apitrcp = api.serviceRequest;
    const {
        data: services,
        isLoading,
        isFetched,
        fetchNextPage
    } = apitrcp.getAll.useInfiniteQuery({
        limit: 6,
    },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );

    const hasNextPage = !!services?.pages[services.pages.length - 1]?.nextCursor;
    const handleFetchNextPage = async () => {
        await fetchNextPage();

    };
    const servicesContent = services?.pages.map((page) => page.serviceRequestItems.map((service) => (
        <ServiceRequestCard key={service.id} service={service} />
    )));
    const rows = [], len = 6;
    let i = 0
    while (++i <= len) rows.push(i);
    const Skeletons = rows.map((i) => (
        <Skeleton key={i} className="w-full bg-slate-300 min-h-64 h-full" />
    ));
    return (
        <>
            <div className="w-full md:px-28 py-4 h-full  ">
                <div className="w-full flex flex-col h-full  gap-3">
                {isLoading && Skeletons}
                </div>
                {!!servicesContent && <InfiniteScroll
                    dataLength={ servicesContent?.length }
                    next={handleFetchNextPage}
                    hasMore={hasNextPage}
                    loader={<div className="w-full mt-3 flex flex-col h-full  gap-3">
                        {Skeletons}
                    </div>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Haz visto todas las solicitudes para tus categorias en tu zona</b>
                        </p>
                    }
                >
                    <div className="w-full flex flex-col h-full  gap-3">
                        {servicesContent}
                    </div>
                </InfiniteScroll>}
                {/* ...rest of the code... */}
                {!isLoading && !servicesContent && (
                    <div className="text-2xl">Aun no hay ninguna solicitud de servicio</div>
                )}
            </div>
        </>
    );
};

export default ServiceRequestList;