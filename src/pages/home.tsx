import { type NextPage } from "next";
import Head from "next/head";

import { useMemo } from "react";
import Layout from "~/components/layouts";
import { useAccessToken, useCode } from "~/lib/zustand/codeSlice";

import dynamic from "next/dynamic";
const HomeStuffDynamic = dynamic(() => import("../components/home/HomeStuff"), {
  ssr: false,
});

const Home: NextPage = () => {
  const code = useCode();
  const token = useAccessToken();

  const isLoggedIn = useMemo(() => !!code || !!token, [token, code]);

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Proof of development" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <HomeStuffDynamic isLoggedIn={isLoggedIn} />
      </Layout>
    </>
  );
};

export default Home;
