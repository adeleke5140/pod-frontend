import { type NextPage } from "next";
import Head from "next/head";
import Layout from "~/components/layouts";
import { ArrowRight, UserCheck } from "react-feather";
import { redirectURL } from "../constants";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCode, useAuthActions, useRepos } from "~/lib/zustand/codeSlice";

const Home: NextPage = () => {
  const router = useRouter();
  const code = useCode();
  const { setCode, fetchAccessToken, fetchRepos } = useAuthActions();
  const repos = useRepos();

  console.log(repos);
  useEffect(() => {
    const code = router.query.code;
    if (code && !Array.isArray(code)) {
      setCode(code);
      console.log(code);
    }
    void (async () => {
      code && (await fetchAccessToken());
      code && (await fetchRepos());
    })();
  }, [router, setCode, fetchAccessToken, fetchRepos]);

  const clearCode = () => {
    setCode("");
    void router.replace("/home", undefined, { shallow: true });
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Proof of development" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="mt-16 flex flex-col gap-8 text-left">
          <h1 className="font-bespoke text-7xl font-bold">
            {code ? "Welome to POD!" : "Authorize"}
          </h1>
          <div className="flex gap-4">
            {" "}
            <a
              href={redirectURL}
              className={`${
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                code ? "pointer-events-none" : null
              } group flex cursor-pointer gap-2 self-start rounded-3xl bg-blue-600 px-5 py-3 text-xl font-semibold text-white transition-colors ease-out hover:bg-blue-700 disabled:opacity-50`}
            >
              {code ? "Authorized" : "Authorize with Github"}
              {!code ? (
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              ) : (
                <UserCheck />
              )}
            </a>
            {code && (
              <button
                onClick={clearCode}
                className="group flex cursor-pointer gap-2 self-start rounded-3xl bg-red-500 px-5 py-3 text-xl font-semibold text-white transition-colors ease-out hover:bg-red-600 disabled:opacity-50"
              >
                Disconnect
              </button>
            )}
          </div>
        </div>
        <div className="text-left">
          <h2 className="text-3xl font-semibold">Repositories</h2>
          <p className="text-md">
            Select one that you would like to get contributions for and reward
            devs with PODs
          </p>
        </div>
      </Layout>
    </>
  );
};

export default Home;