import { type NextPage } from "next";
import Head from "next/head";
import Layout from "~/components/layouts";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>POD</title>
        <meta name="description" content="Proof of development" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="mx-auto my-0 max-w-6xl text-center">
          <h1 className="mt-16 text-center font-bespoke text-7xl font-bold capitalize sm:mt-36">
            Proof of <span className="text-blue-600">development</span>
          </h1>
          <p className="mt-4 text-lg">
            Get rewarded for your contributions to the open source ecosystem.
          </p>
        </div>
      </Layout>
    </>
  );
};

export default Home;
