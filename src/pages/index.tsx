import { type NextPage } from "next";
import Head from "next/head";
import Layout from "~/components/layouts";
import { ArrowRight } from "react-feather";
import Link from "next/link";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>POD</title>
        <meta name="description" content="Proof of development" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex flex-col gap-8 text-center">
          <div>
            <h1 className="text-center font-bespoke text-5xl font-bold capitalize md:mt-36 md:text-9xl">
              Proof of <span className="text-blue-600">development</span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl">
              Elevate Your Brand with Exceptional Collectibles from POD.
            </p>
          </div>

          <Link
            href="/home"
            className="group flex cursor-pointer items-center justify-center gap-2 self-center rounded-3xl bg-blue-600 px-5 py-3 text-xl font-semibold text-white transition-colors ease-out hover:bg-blue-700 disabled:opacity-50"
          >
            Let&apos;s go
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default Index;
