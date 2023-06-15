import { type NextPage } from "next";
import Head from "next/head";
import Layout from "~/components/layouts";
import { ArrowRight } from "react-feather";
import { SignupDialog } from "~/components/signupModal/modalTrigger";

const Index: NextPage = () => {
  function showDialog() {
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
        <div className="mx-auto my-0 flex max-w-4xl flex-col gap-8 text-center">
          <div>
            <h1 className="text-center font-bespoke text-5xl font-bold capitalize md:mt-[2%] md:text-8xl">
              Proof of <span className="text-blue-600">development</span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl">
              Reward developers for their contributions to open source.
              Incentivize quality open source contributions by assigning a POD
              to your open source project.
            </p>
          </div>

          <button
            onClick={showDialog}
            className="group flex cursor-pointer items-center justify-center gap-2 self-center rounded-3xl bg-blue-600 px-5 py-3 text-xl font-semibold text-white transition-colors ease-out hover:bg-blue-700 disabled:opacity-50"
          >
            Get Started
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>

          <div className="pb-8 mt-6 text-left">
            <div className="flex flex-col md:flex-row gap-6 md:gap-[2%]">
              <section className="cursor:default select-none md:basis-[32rem] p-4 border-2 border-gray-100 border-blue-500 rounded-lg  hover:border-blue-500 transition-all">
                <h2 className="mb-2 font-bespoke text-xl font-semibold">Create your <span className="text-blue-600">POD</span></h2>
                <p>
                  Create a <span className="text-blue-600">POD</span> for your open source project.
                </p>
              </section>
              <section className="cursor:default select-none p-4 md:basis-[32rem] border-2 border-gray-100 border-blue-500 rounded-lg hover:border-blue-500 transition-colors">
                <h2 className="mb-2 font-bespoke text-xl font-semibold">Get <span className="text-blue-600">Unique</span> Link</h2>
                <p>
                  Get a unique link for your <span className="text-blue-600">POD</span> and share it with your community/contributors.
                </p>
              </section>
              <section className="cursor:default select-none p-4 md:basis-[32rem] border-2  border-gray-100 border-blue-500 rounded-lg hover:border-blue-500 transition-colors">
                <h2 className="mb-2  font-bespoke text-xl font-semibold">Contributors Mint <span className="text-blue-600">POD</span></h2>
                <p>
                  We verify the contributions made and mint <span className="text-blue-600">POD</span> for the contributors.
                </p>
              </section>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Index;
