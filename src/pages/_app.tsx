import { ClerkProvider } from "@clerk/nextjs";
import { type MyPage, type MyAppProps } from "~/components/types/types";
import { Layouts } from "~/components/layouts/Layouts";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import React from "react";

import { Inter } from "@next/font/google";
import { Poppins } from "@next/font/google";

import { Toaster } from "~/components/ui/toaster";


const poppins = Poppins({
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: "normal",
  subsets: ["latin"],
});


import { enableReactUse } from "@legendapp/state/config/enableReactUse";
enableReactUse();
function MyApp({ Component, pageProps }: MyAppProps) {
  const Layout = Layouts[Component.Layout] ?? ((page: MyPage) => page);
  const title = Component.Title || "Solucionado App";
  const description = Component.Description || "app solucionado";


  return (
    <main className={poppins.className}>
      <ClerkProvider {...pageProps}>
        <Layout title={title} description={description}>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </ClerkProvider>
    </main>
  );
}
export default api.withTRPC(MyApp);
