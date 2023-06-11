import { type Session } from "next-auth";
import { type AppType } from "next/app";
import "~/styles/globals.css";
import { bespokeStencil, supremeFont } from "~/fonts/setup";
import { ThemeProvider } from "degen";
import "degen/styles";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ThemeProvider>
      <div className={`${bespokeStencil.variable} ${supremeFont.variable}`}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
};

export default MyApp;
