import { ClerkProvider } from "@clerk/nextjs";
import { type MyAppProps } from "~/components/types/types";
import { Layouts } from "~/components/layouts/Layouts";
import { api } from "~/utils/api";
import "~/styles/globals.css";

function MyApp({ Component, pageProps }: MyAppProps) {

  const Layout = Layouts[Component.Layout] ?? ((page) => page);

  return (
    <ClerkProvider {...pageProps}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
}
export default api.withTRPC(MyApp);




