import { WagmiConfig } from "wagmi";
import { config } from "./wagmiConfig";
import { ConnectKitProvider } from "connectkit";

interface WagmiProviderProps {
  children: React.ReactNode;
}

export const WagmiProvider = ({ children }: WagmiProviderProps) => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider mode="light">{children}</ConnectKitProvider>
    </WagmiConfig>
  );
};
