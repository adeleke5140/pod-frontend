import { createPublicClient, http } from "viem";
import { filecoinCalibration } from "viem/chains";

export const viemClient = createPublicClient({
  chain: {
    ...filecoinCalibration,
    rpcUrls: {
      default: { http: ["https://filecoin-calibration.chainup.net/rpc/v1"] },
      public: { http: ["https://api.calibration.node.glif.io/rpc/v1"] },
    },
  },
  transport: http(),
});
