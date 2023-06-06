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
        <div className="mx-auto my-0 mt-16 flex max-w-6xl flex-col gap-8 text-center">
          <div>
            <h1 className="text-center font-bespoke text-7xl font-bold capitalize sm:mt-36">
              Proof of <span className="text-blue-600">development</span>
            </h1>
            <p className="mt-2 text-lg">
              Get rewarded for your contributions to the open source ecosystem.
            </p>
          </div>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex justify-center"
          >
            <button className="flex cursor-pointer items-center justify-center gap-2 rounded bg-blue-600 px-5 py-3 text-xl font-semibold text-white transition-colors ease-out hover:bg-blue-700 disabled:opacity-50">
              Connect Repo
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Home;
