import type { AppProps } from "next/app";
import "~/styles/globals.css";
import { bespokeStencil, supremeFont } from "~/fonts/setup";
import { ThemeProvider } from "degen";
import "degen/styles";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <div className={`${bespokeStencil.variable} ${supremeFont.variable}`}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
};

export default MyApp;
