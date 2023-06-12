import { type NextPage } from "next";
import Head from "next/head";
import Layout from "~/components/layouts";
import { ArrowRight } from "react-feather";
import { SignupDialog } from "~/components/signupModal/modalTrigger";

const Index: NextPage = () => {
  function showDialog() {
    console.log("clicked");
    SignupDialog.show();
  }
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
            <h1 className="text-center font-bespoke text-5xl font-bold capitalize md:mt-[6%] md:text-9xl">
              Proof of <span className="text-blue-600">development</span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl">
              Rewarding developers for their contributions to open source
            </p>
          </div>

          <button
            onClick={showDialog}
            className="group flex cursor-pointer items-center justify-center gap-2 self-center rounded-3xl bg-blue-600 px-5 py-3 text-xl font-semibold text-white transition-colors ease-out hover:bg-blue-700 disabled:opacity-50"
          >
            Get Started
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </Layout>
    </>
  );
};

export default Index;
