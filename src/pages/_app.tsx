import { ClerkProvider } from "@clerk/nextjs";
import { type MyPage, type MyAppProps } from "~/components/types/types";
import { Layouts } from "~/components/layouts/Layouts";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import React from "react";

import { Inter } from "@next/font/google";
import { Toaster } from "~/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: MyAppProps) {
  const Layout = Layouts[Component.Layout] ?? ((page: MyPage) => page);

  return (
    <main className={inter.className}>
      <ClerkProvider {...pageProps}>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </ClerkProvider>
    </main>
  );
}
export default api.withTRPC(MyApp);
