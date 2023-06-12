import { useRouter } from "next/router";
import Layout from "~/components/layouts";
import { useAccessToken, useRepos } from "~/lib/zustand/codeSlice";
import * as Form from "@radix-ui/react-form";
import { ArrowRight, Check } from "react-feather";
import { useEffect, useState } from "react";
import { uploadPOD } from "~/lib/web3.storage/uploadPOD";
import { Spinner } from "~/components/spinner";
import { toast } from "sonner";

interface Data {
  "contributions-required": string;
  images: File;
  name: string;
  supply?: string;
}

const RepoPage = () => {
  const repos = useRepos();
  const token = useAccessToken();
  const router = useRouter();
  const { id: name } = router.query;
  const code = router.query.code;
  const [pctUploaded, setPctUploaded] = useState(0);
  const [cid, setCid] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const repo = repos.filter((repo) => repo.name === name)[0];

  function navigateToAll() {
    void router.replace({
      pathname: "/home",
      query: { code },
    });
  }

  useEffect(() => {
    if (!token) {
      void router.push("/home");
    }
  });

  async function handleCreatePOD(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsUploading(true);
    const data = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as unknown as Data;
    const { cid, pct } = await uploadPOD([data.images]);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPctUploaded(pct);
    setCid(cid);
    setIsUploading(false);
    toast.success("POD Created Successfully");
  }
  return (
    <Layout>
      <div className="mx-auto flex max-w-xl flex-col gap-8 pb-8 text-left">
        <button
          onClick={navigateToAll}
          className="w-max rounded-b-lg p-1 shadow transition-shadow ease-linear hover:shadow-md"
        >
          All repos
        </button>
        <h1 className="mb-6 font-bespoke text-7xl font-bold">
          Create a <span className="text-blue-500">POD</span>
        </h1>
        <div>
          <h2>
            <span className="text-xl font-medium opacity-50">Repo:</span>
            <span className="text-xl"> {repo?.name}</span>
          </h2>
          <p>
            <span className="text-xl font-medium opacity-50">Description:</span>{" "}
            <span className=" text-xl">
              {" "}
              {repo?.description || "No Description"}
            </span>
          </p>
        </div>

        <div className="">
          <p className="mb-4 text-blue-500">
            Tip: You need to fill in the name of the POD, the minimum
            contribution developer would have to make, a max supply and an image
            of the POD.
          </p>
          <Form.Root
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleCreatePOD}
            className="flex w-[500px] flex-col gap-6"
          >
            <Form.Field className="mb-[10px] grid" name="name">
              <div className="flex items-baseline justify-between">
                <Form.Label className="text-[15px] font-medium leading-[35px]">
                  Name
                </Form.Label>
                <Form.Message
                  className="text-[13px] text-red-500 opacity-[0.9]"
                  match="valueMissing"
                >
                  Please enter the name of the POD
                </Form.Message>
                <Form.Message
                  className="text-[13px] text-red-500 opacity-[0.9]"
                  match="typeMismatch"
                >
                  Please provide a valid name
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="selection:color-white box-border inline-flex h-[50px] w-full appearance-none items-center justify-center rounded-[4px] px-[10px] text-xl leading-none shadow-[0_0_0_1px] shadow-gray-400 outline-none selection:bg-blue-100 focus:ring-2 focus:ring-blue-600"
                  type="text"
                  required
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
                  className="selection:color-black box-border inline-flex h-[50px] w-full resize-none appearance-none items-center justify-center rounded-[4px] p-[10px] text-xl leading-none shadow-[0_0_0_1px] shadow-gray-400 outline-none selection:bg-blue-100  focus:ring-2 focus:ring-blue-500"
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
                  className="selection:color-black box-border inline-flex h-[50px] w-full resize-none appearance-none items-center justify-center rounded-[4px] border-blue-200 p-[10px] text-xl leading-none shadow-[0_0_0_1px] shadow-gray-400 outline-none selection:bg-blue-100 focus:ring-2 focus:ring-blue-500"
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
                  className="selection:color-black inline-flex h-[50px] w-full resize-none appearance-none items-center justify-center p-[10px] text-xl leading-none outline-none selection:bg-blue-100 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-medium file:text-blue-600 file:transition-colors file:hover:bg-blue-100 focus:ring-2 focus:ring-blue-500"
                />
              </Form.Control>
            </Form.Field>
            {pctUploaded > 0 ? (
              pctUploaded < 100 ? (
                <span className="rounded-full bg-blue-100 p-3 text-blue-500">
                  Uploading
                </span>
              ) : (
                <span className="flex w-max items-center justify-center gap-2 rounded-full bg-green-100 p-3 py-2 text-sm font-medium text-green-500">
                  <Check />
                  Image Uploaded to IPFS
                </span>
              )
            ) : null}
            <Form.Submit asChild>
              <button
                disabled={isUploading}
                className="group flex cursor-pointer items-center justify-center gap-2 self-end rounded-3xl bg-blue-600 px-5 py-3 text-xl font-semibold text-white transition-colors ease-out hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <Spinner size="sm" /> <span>Creating...</span>
                  </>
                ) : (
                  <span>Create POD</span>
                )}
                {!isUploading ? (
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                ) : null}
              </button>
            </Form.Submit>
          </Form.Root>
        </div>
      </div>
    </Layout>
  );
};

export default RepoPage;
