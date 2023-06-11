import type { AppProps } from "next/app";
import "~/styles/globals.css";
import { bespokeStencil, supremeFont } from "~/fonts/setup";
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={`${bespokeStencil.variable} ${supremeFont.variable}`}>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
