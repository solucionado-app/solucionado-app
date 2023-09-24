/* eslint-disable @typescript-eslint/no-unsafe-argument */

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"

import { BellRing } from 'lucide-react';
import NotificationsContent from "./NotificationsContent";



type props = {
    notificationsNumber: number
}

const NotificationsComponent = ({ notificationsNumber }: props) => {
    const rows = [], len = notificationsNumber;
    let i = 0
    while (++i <= len) rows.push(i);
    return (
        <DropdownMenu  >

            <DropdownMenuTrigger className="group relative" >
                <>
                    {notificationsNumber > 0 && <div className="absolute inline-flex items-center justify-center text-white w-4 h-4 text-xs font-bold  bg-red-500  rounded-full
                     -top-2 -right-2 dark:border-gray-900">{notificationsNumber}</div>}
                    <BellRing className="group-data-[state=open]:fill-white  group-data-[state=closed]:fill-none  w-7 h-7 " />
                </>
            </DropdownMenuTrigger>
            <DropdownMenuContent id="dropcontent" className="p-0 mr-2 md:mr-6 " >
                <NotificationsContent notificationsNumber={notificationsNumber} />

            </DropdownMenuContent>
        </DropdownMenu>


    );
};

export default NotificationsComponent;

{/* <svg className="fill-white w-8 h-8 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" /></svg> */ }