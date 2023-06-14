import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { UserCheck } from "react-feather";
import { toast } from "react-hot-toast";
import Layout from "~/components/layouts";
import { Repos } from "~/components/repos";
import {
  useAccessToken,
  useAuthActions,
  useCode,
} from "~/lib/zustand/codeSlice";
import { redirectURL } from "../constants";
import Link from 'next/link'

const Home: NextPage = () => {
  const router = useRouter();
  const code = useCode();
  const token = useAccessToken();
  const { setCode, fetchAccessToken, fetchRepos, clearCache } =
    useAuthActions();

  useEffect(() => {
    let isMounted = true
    const URLcode = router.query.code;

    if (URLcode && !Array.isArray(URLcode)) {
      isMounted && setCode(URLcode);
    }

    return () => {
      isMounted = false;
    }
  }, [setCode, router]);

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
          <h1 className="font-bespoke text-7xl font-bold">
            {code ? "Welome to POD!" : "Authorize for full Access"}
          </h1>
          <div className="flex gap-4 md:absolute md:right-0">
            {
              code ? <a
                href={redirectURL}
                className={`${
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  code ? "pointer-events-none" : null
                  } text-md group flex cursor-pointer gap-2 self-start rounded-3xl bg-blue-600 px-5 py-3 font-semibold text-white transition-colors ease-out hover:bg-blue-700 disabled:opacity-50`}
              >
                Authorized
                <UserCheck />
              </a> :
                <Link href="/" className="text-md group flex cursor-pointer gap-2 self-start rounded-3xl bg-blue-600 px-5 py-3 font-semibold text-white transition-colors ease-out hover:bg-blue-700 disabled:opacity-50">
                  Login
                </Link>
            }
            {code ? <button
              onClick={clearCode}
              className="text-md group flex cursor-pointer gap-2 self-start rounded-3xl bg-red-500 px-5 py-3 font-semibold text-white transition-colors ease-out hover:bg-red-600 disabled:opacity-50"
            >
              Log out
            </button> : null}
          </div>
        </div>
        <div className="text-left">
          {code ? <Repos /> : "Cannot access Repo without authorization"}
        </div>
      </Layout>
    </>
  );
};

export default Home;
