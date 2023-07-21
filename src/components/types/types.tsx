import { type NextComponentType, type NextPage, type NextPageContext } from "next";
import { type AppProps } from "next/app";
import { type LayoutKeys } from "../layouts/Layouts";
import { type PropsWithChildren } from "react";
export type MyPage<P = object, IP = P> = NextPage<P, IP> & {
    Layout?: LayoutKeys;
};
export type MyAppProps = AppProps & {
    Component: NextComponentType<NextPageContext, any, any> & {
        Layout: LayoutKeys;
    };
};
