import { type NextPage } from "next";
import Head from "next/head";
import Layout from "~/components/layouts";
import { UserCheck } from "react-feather";
import { redirectURL } from "../constants";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  useCode,
  useAuthActions,
  useAccessToken,
} from "~/lib/zustand/codeSlice";
import { Repos } from "~/components/repos";
import { toast } from "react-hot-toast";

const Home: NextPage = () => {
  const router = useRouter();
  const code = useCode();
  const token = useAccessToken();
  const { setCode, fetchAccessToken, fetchRepos, clearCache } =
    useAuthActions();

  useEffect(() => {
    let isMounted = true;
    if (code) {
      isMounted && toast.success("Authorized");
    }
    return () => {
      isMounted = false;
    };
  }, [code]);

  useEffect(() => {
    const code = router.query.code;
    if (code && !Array.isArray(code)) {
      setCode(code);
    }
  }, [code, setCode, router]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      code && void fetchAccessToken();
    }

    return () => {
      isMounted = false;
    };
  }, [code, fetchAccessToken]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      token && void fetchRepos();
    }
    return () => {
      isMounted = false;
    };
  }, [token, fetchRepos]);

  const clearCode = () => {
    clearCache();
    void router.replace("/home", undefined, { shallow: true });
    void router.push("/");
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
          <h1 className="font-bespoke text-7xl font-bold">Welome to POD!</h1>
          <div className="flex gap-4 md:absolute md:right-0">
            <a
              href={redirectURL}
              className={`${
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                code ? "pointer-events-none" : null
              } text-md group flex cursor-pointer gap-2 self-start rounded-3xl bg-blue-600 px-5 py-3 font-semibold text-white transition-colors ease-out hover:bg-blue-700 disabled:opacity-50`}
            >
              Authorized
              <UserCheck />
            </a>

            <button
              onClick={clearCode}
              className="text-md group flex cursor-pointer gap-2 self-start rounded-3xl bg-red-500 px-5 py-3 font-semibold text-white transition-colors ease-out hover:bg-red-600 disabled:opacity-50"
            >
              Log out
            </button>
          </div>
        </div>
        <Repos />
      </Layout>
    </>
  );
};

export default Home;
