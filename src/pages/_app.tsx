import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import "~/styles/globals.css";
import { bespokeStencil, supremeFont } from "~/fonts/setup";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className={`${bespokeStencil.variable} ${supremeFont.variable}`}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default MyApp;
