import type { AppProps as NextAppProps } from "next/app";
import Layout from "../components/Layout";
import globalStyles from "../styles/global";

// TODO temporarily fixes
type AppProps = NextAppProps & {
  Component: any;
};

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
