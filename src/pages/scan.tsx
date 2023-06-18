import { useChains } from "connectkit";
import { useEffect, useState } from "react";
import Layout from "~/components/layouts";
import { callibrationRpc, podContract, redirectMintURL } from "~/constants";
import { useRouter } from "next/router";
import { ArrowRight } from "react-feather";
import {
  useMintActions,
  useMintCode,
  useMintEligibility,
  useMintLoading,
  useMintTransactionHash,
  useProjectHash,
} from "~/lib/zustand/mintSlice";
import { Spinner } from "~/components/spinner";
import { viemClient } from "~/lib/viem/client";
import PodAbi from "../abi/PoDNFT.sol/PoDNFT.json";

const Scan = () => {
  const loading = useMintLoading();
  const { setProjectHash, setCode, setWalletAddress, checkMintEligibility } =
    useMintActions();
  const [address, setAddress] = useState("");

  const chains = useChains();

  async function getNfts() {
    //e.preventDefault();
    // const data = Object.fromEntries(
    //   new FormData(e.currentTarget)
    // ) as unknown as { "wallet-address": string };

    // if (data["wallet-address"].includes(".eth")) {
    //   toast.error("Ens name not supported yet");
    // } else {
    //   setWalletAddress(data["wallet-address"]);
    // }

    const filter = await viemClient.createContractEventFilter({
      abi: PodAbi.abi,
      address: podContract,
      eventName: "Transfer",
      strict: true,
      args: {
        from: "0x0000000000000000000000000000000000000000",
        to: "0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac",
      },
    });
    const logs: any[] = await viemClient.getFilterLogs({ filter });
    console.log("Fitler", logs);
  }

  return (
    <Layout>
      <div className="mx-auto my-0 flex max-w-[25rem] flex-col gap-4">
        <div>
          <h1 className="font-bespoke text-7xl font-bold">
            Check your <span className="text-blue-500">PODs</span>
          </h1>
          <div className="mt-2 text-center">
            <span className="text-sm opacity-50">Supported Network:</span>{" "}
            {chains.map((chain) => (
              <code
                className="inset-2 rounded-lg bg-gray-100 px-2 py-2 text-xs"
                key={chain.id}
              >
                {chain.name}
              </code>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between">
              <div className="font-supreme text-[15px] font-medium leading-[35px]">
                Wallet Address
              </div>
              {/* <div
                className="text-[13px] text-red-500 opacity-[0.9]"
                match="valueMissing"
              >
                Please enter your wallet address or ens name
              </div> */}
            </div>

            <input
              className="selection:color-black box-border inline-flex h-[50px] w-full resize-none appearance-none items-center justify-center rounded-xl p-[10px] pl-4 font-supreme text-base leading-none shadow-[0_0_0_1.2px] shadow-gray-400 outline-none selection:bg-blue-100  focus:ring-2 focus:ring-blue-500"
              type="text"
              required
              onChange={(e) => setAddress(e.target.value)}
            />

            <button
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                getNfts();
              }}
              disabled={loading}
              className="group flex cursor-pointer items-center justify-center gap-2  rounded-3xl bg-blue-600 px-5 py-3 text-xl font-semibold text-white transition-colors ease-out hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Spinner size="sm" /> <span>Verifying...</span>
                </>
              ) : (
                <span>Check</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Scan;
