import { ClerkProvider } from "@clerk/nextjs";
import { type MyPage, type MyAppProps } from "~/components/types/types";
import { Layouts } from "~/components/layouts/Layouts";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import React from "react";

import { Inter } from "@next/font/google";
import { Toaster } from "~/components/ui/toaster";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

import { enableReactUse } from "@legendapp/state/config/enableReactUse";
enableReactUse();
function MyApp({ Component, pageProps }: MyAppProps) {
  const Layout = Layouts[Component.Layout] ?? ((page: MyPage) => page);

  return (
    <main className={inter.className + ' flex h-screen   flex-col items-center text-slate-900 bg-gradient-to-b from-slate-50 to-slate-100'}>
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
