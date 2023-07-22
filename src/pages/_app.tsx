import { ClerkProvider } from "@clerk/nextjs";
import { type MyPage, type MyAppProps } from "~/components/types/types";
import { Layouts } from "~/components/layouts/Layouts";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import React from "react";


function MyApp({ Component, pageProps }: MyAppProps) {

  const Layout = Layouts[Component.Layout] ?? ((page: MyPage) => page);

  return (
    <ClerkProvider {...pageProps}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
}
export default api.withTRPC(MyApp);




