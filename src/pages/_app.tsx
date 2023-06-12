import type { AppProps } from "next/app";
import "~/styles/globals.css";
import { bespokeStencil, supremeFont } from "~/fonts/setup";
import { DialogRoot } from "~/components/dialog/dialogRoot";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "sonner";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) setContainer(containerRef.current);
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className={`${bespokeStencil.variable} ${supremeFont.variable}`}
      >
        <Toaster position="top-center" />
        <DialogRoot container={container} />
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default MyApp;
