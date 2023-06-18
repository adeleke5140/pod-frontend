import * as Form from "@radix-ui/react-form";
import { ConnectKitButton } from "connectkit";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Check } from "react-feather";
import { toast } from "react-hot-toast";
import { useSignMessage } from "wagmi";
import Layout from "~/components/layouts";
import { Spinner } from "~/components/spinner";
import { uploadPOD } from "~/lib/web3.storage/uploadPOD";
import { useAccessToken, useRepos } from "~/lib/zustand/codeSlice";
import {
  useIsCreatingPod,
  usePodActions,
  usePodCreationDetails,
} from "~/lib/zustand/podSlice";
import { PodDetailsTrigger } from "~/components/podDetails/podTrigger";
import { mintDomain } from "~/constants";

interface Data {
  "contributions-required": string;
  images: File;
  name: string;
  supply?: string;
}

const RepoPage = () => {
  const [pctUploaded, setPctUploaded] = useState(0);
  const [cid, setCid] = useState("");
  const [signedMessage, setSignedMessage] = useState<unknown>("");
  const [podCreationSuccess, setPodCreationSuccess] = useState(false);

  //from zustand
  const repos = useRepos();
  const token = useAccessToken();
  const { setPodDetails, createPod, startLoading, stopLoading } =
    usePodActions();
  const podCreationDetails = usePodCreationDetails();
  const loading = useIsCreatingPod();

  //get repo
  const router = useRouter();
  const { id: name } = router.query;
  const code = router.query.code;
  const repo = repos.filter((repo) => repo.name === name)[0];

  //singning messsage
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: `I want to allow contributors to mint NFTs for my project:${name as string
      }`,
  });

  function navigateToAll() {
    void router.replace({
      pathname: "/home",
      query: { code },
    });
  }

  useEffect(() => {
    if (!token) {
      void router.push("/");
    }
  });

  function handleSignMessage() {
    signMessage();
  }

  useEffect(() => {
    isError && toast.error("Error signing message");
    isSuccess && setSignedMessage(data);
  }, [isError, isSuccess, data]);

  const handleCreatePOD = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as unknown as Data;

    startLoading();
    const { cid, pct } = await uploadPOD([data.images]);

    setPctUploaded(pct);
    setCid(cid);

    const podData = {
      nftUri: cid,
      signature: signedMessage,
      projectName: data.name,
      minContributions: Number(data["contributions-required"]),
    };

    setPodDetails(podData);
    const res = await createPod();
    console.log({
      created: res?.created,
    })
    if (res?.created === 'success') {
      setPodCreationSuccess(true);
      toast.success(res.message);
    } else if (res?.created === 'failed') {
      toast.error(res.message);
    }
  }, [createPod, setPodDetails, signedMessage, startLoading])

  const showPodDetails = useCallback(() => {
    const link = `${mintDomain}/mint?pHash=${podCreationDetails.pHash}`;
    PodDetailsTrigger.show({
      link: link,
      tHash: podCreationDetails.tHash,
    });
  }, [podCreationDetails.pHash, podCreationDetails.tHash])
  return (
    <Layout>
      <div className="mx-auto flex max-w-xl flex-col gap-8 pb-8 text-left">
        <div className="flex items-center justify-between font-supreme">
          <button
            onClick={navigateToAll}
            className="w-max rounded-b-lg p-1 shadow transition-shadow ease-linear hover:shadow-md"
          >
            All repos
          </button>
          <ConnectKitButton label="Connect Wallet" theme="soft" />
        </div>
        <h1 className="mb-6 font-bespoke text-7xl font-bold">
          Create a <span className="text-blue-500">POD</span>
        </h1>
        <div>
          <h2>
            <span className="font-medium opacity-50">Repo:</span>
            <span className=""> {repo?.name}</span>
          </h2>
          <p>
            <span className="font-medium opacity-50">Description:</span>{" "}
            <span className=""> {repo?.description || "No Description"}</span>
          </p>
        </div>

        <div className="">
          <Form.Root
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleCreatePOD}
            className="flex w-[500px] flex-col gap-6"
          >
            <Form.Field className="mb-[10px] grid" name="name">
              <div className="flex items-baseline justify-between">
                <Form.Label className="text-[15px] font-medium leading-[35px]">
                  Project Name
                </Form.Label>
              </div>
              <Form.Control asChild>
                <input
                  className="selection:color-white box-border inline-flex h-[50px] w-full appearance-none items-center justify-center rounded-xl px-[10px] text-xl leading-none shadow-[0_0_0_1.2px] shadow-gray-400 outline-none selection:bg-blue-100 focus:ring-2 focus:ring-blue-600"
                  type="text"
                  required
                  readOnly
                  value={repo?.name}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field
              className="mb-[10px] grid"
              name="contributions-required"
            >
              <div className="flex items-baseline justify-between">
                <Form.Label className="text-[15px] font-medium leading-[35px]">
                  Minimum Contributions
                </Form.Label>
                <Form.Message
                  className="text-[13px] text-red-500 opacity-[0.89]"
                  match="valueMissing"
                >
                  Please enter a valid number
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  type="number"
                  min={1}
                  className="selection:color-black box-border inline-flex h-[50px] w-full resize-none appearance-none items-center justify-center rounded-xl p-[10px] text-xl leading-none shadow-[0_0_0_1.2px] shadow-gray-400 outline-none selection:bg-blue-100  focus:ring-2 focus:ring-blue-500"
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="mb-[10px] grid" name="supply">
              <div className="flex items-baseline justify-between">
                <Form.Label className="text-[15px] font-medium leading-[35px]">
                  Supply(optional)
                </Form.Label>
              </div>
              <Form.Control asChild>
                <input
                  type="number"
                  min={0}
                  className="selection:color-black box-border inline-flex h-[50px] w-full resize-none appearance-none items-center justify-center rounded-xl border-blue-200 p-[10px] text-xl leading-none shadow-[0_0_0_1.2px] shadow-gray-400 outline-none selection:bg-blue-100 focus:ring-2 focus:ring-blue-500"
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="mb-[10px] grid" name="images">
              <div className="flex items-baseline justify-between">
                <Form.Label className="text-[15px] font-medium leading-[35px]">
                  Choose an Image
                </Form.Label>
                <Form.Message
                  className="text-[13px] text-red-500 opacity-[0.9]"
                  match="valueMissing"
                >
                  Please add the image of your NFT
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  type="file"
                  required
                  className="selection:color-black inline-flex h-[50px] w-full resize-none appearance-none items-center justify-center p-[10px] text-base leading-none outline-none selection:bg-blue-100 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-medium file:text-blue-600 file:transition-colors file:hover:bg-blue-100 focus:ring-2 focus:ring-blue-500"
                />
              </Form.Control>
            </Form.Field>
            {pctUploaded > 0 ? (
              pctUploaded < 100 ? (
                <span className="rounded-full bg-blue-100 p-3 text-blue-500">
                  Uploading...
                </span>
              ) : (
                <span className="-mt-4 flex w-max items-center justify-center gap-2 rounded-full bg-green-100 p-2 py-1 text-sm font-medium text-green-500">
                  <Check />
                  Image Uploaded.
                </span>
              )
            ) : null}
            <span className="inset-2 rounded-lg bg-gray-100 px-2 py-1">
              Connect your wallet and sign this message
            </span>

            <button
              type="button"
              disabled={isLoading || isSuccess}
              onClick={handleSignMessage}
              className="cursor-default self-start rounded-3xl bg-blue-50 px-3 py-1 font-medium text-blue-500 transition-colors hover:bg-blue-100 disabled:pointer-events-none"
            >
              {isSuccess ? "Message Signed" : "Sign Message"}
            </button>

            {podCreationSuccess ? (
              <button
                type="button"
                onClick={showPodDetails}
                className="group flex cursor-pointer items-center justify-center gap-2 self-end rounded-3xl bg-blue-600 px-5 py-3 text-xl font-semibold text-white transition-colors ease-out hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
              >
                View POD
              </button>
            ) : (
              <Form.Submit asChild>
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex cursor-pointer items-center justify-center gap-2 self-end rounded-3xl bg-blue-600 px-5 py-3 text-xl font-semibold text-white transition-colors ease-out hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" /> <span>Creating...</span>
                    </>
                  ) : (
                    <span>Create Pod</span>
                  )}
                  {!loading ? (
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  ) : null}
                </button>
              </Form.Submit>
            )}
          </Form.Root>
        </div>
      </div>
    </Layout>
  );
};

export default RepoPage;
