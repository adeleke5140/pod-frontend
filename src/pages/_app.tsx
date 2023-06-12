import type { AppProps } from "next/app";
import "~/styles/globals.css";
import { bespokeStencil, supremeFont } from "~/fonts/setup";
import { DialogRoot } from "~/components/dialog/dialogRoot";
import { useRef } from "react";
const MyApp = ({ Component, pageProps }: AppProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div
        ref={containerRef}
        className={`${bespokeStencil.variable} ${supremeFont.variable}`}
      >
        <DialogRoot container={containerRef.current} />
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default MyApp;
