import { type NextPage } from "next";
import Head from "next/head";
import Layout from "~/components/layouts";
import { ArrowRight } from "react-feather";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>POD</title>
        <meta name="description" content="Proof of development" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="mx-auto my-0 mt-12 flex max-w-6xl flex-col gap-8 text-center">
          <div>
            <h1 className="text-center font-bespoke text-5xl font-bold capitalize md:mt-36 md:text-9xl">
              Proof of <span className="text-blue-600">development</span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl">
              Get rewarded for your contributions to the open source ecosystem.
            </p>
          </div>

          <button className="group flex cursor-pointer items-center justify-center gap-2 self-center rounded-3xl bg-blue-600 px-5 py-3 text-xl font-semibold text-white transition-colors ease-out hover:bg-blue-700 disabled:opacity-50">
            Let&apos;s go
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </Layout>
    </>
  );
};

export default Home;
