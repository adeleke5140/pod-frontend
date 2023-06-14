import { createConfig } from "wagmi";
import { filecoinCalibration } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";
import { walletConnectId } from "~/constants";

const chains = [filecoinCalibration];

export const config = createConfig(
  getDefaultConfig({
    appName: "Proof of development",
    appDescription: "Reward open source contribution with NFTS",
    walletConnectProjectId: walletConnectId,
    chains,
  })
);
