import { ClerkProvider } from "@clerk/nextjs";
import { type MyPage, type MyAppProps } from "~/components/types/types";
import { Layouts } from "~/components/layouts/Layouts";
import { api } from "~/utils/api";
import "~/styles/globals.css";

import NextNProgress from 'nextjs-progressbar';

import { Poppins } from "next/font/google";

import { Toaster } from "~/components/ui/toaster";
import { esES } from "~/utils/es-ES";
import { useEffect, useState } from "react";

const poppins = Poppins({
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: "normal",
  subsets: ["latin"],
});

function Loading () {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, [])


  return initialLoad && (
    <NextNProgress color="#ecbb2c" />

  )
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const Layout = Layouts[Component.Layout] ?? ((page: MyPage) => page);
  const title = Component.Title || "Solucionado App";
  const description = Component.Description || "app solucionado";


  return (
    <main className={poppins.className}>
      <ClerkProvider localization={esES} {...pageProps}>
        <Layout title={title} description={description}>
          <Loading />
          <NextNProgress color="#ecbb2c" />
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </ClerkProvider>
    </main>
  );
}
export default api.withTRPC(MyApp);
