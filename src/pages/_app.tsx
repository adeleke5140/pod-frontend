import type { AppProps } from "next/app";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { DialogRoot } from "~/components/dialog/dialogRoot";
import { bespokeStencil, supremeFont } from "~/fonts/setup";
import { WagmiProvider } from "~/lib/wagmi/wagmiProvider";
import "~/styles/globals.css";

interface ProtectedAppProps extends AppProps {
  pageProps: {
    protected?: boolean
  }
}

const MyApp = ({ Component, pageProps }: ProtectedAppProps) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) setContainer(containerRef.current);
  }, []);


  return (
    <WagmiProvider>
      <div
        ref={containerRef}
        className={`${bespokeStencil.variable} ${supremeFont.variable}`}
      >
        <Toaster position="top-center" />
        <DialogRoot container={container} />
        <Component {...pageProps} />
      </div>
    </WagmiProvider>
  );
};

export default MyApp;
