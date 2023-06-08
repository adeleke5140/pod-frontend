import { type NextPage } from "next";
import Head from "next/head";
import Layout from "~/components/layouts";

const About: NextPage = () => {

  return (
    <>
      <Head>
        <title>About Pod</title>
        <meta name="description" content="Proof of development" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div>
          <p className="mb-8 text-left font-bold text-blue-600 underline">
            About the protocol
          </p>
          <div className="flex flex-col gap-16">
            <section className="max-w-2xl text-left">
              <h1 className="mb-4 font-bespoke text-3xl font-bold">
                What is <span className="text-blue-600">POD?</span>
              </h1>
              <p className="mb-2 text-lg">
                The Proof of development protocol turns open source
                contributions into collectibles. It is a way to reward
                developers for their work and incentivize them to contribute
                more to the open source ecosystem.
              </p>
              <p className="text-lg">
                Open source contributions are a great way to show your skills
                and build a reputation. However, it is not always easy to get
                noticed and rewarded for your work. The Proof of development
                protocol aims to solve this problem by turning open source
                contributions into collectibles.
              </p>
            </section>
            <section className="max-w-3xl text-left text-lg">
              <h2 className="mb-4 font-bespoke text-3xl font-bold">
                <span className="text-blue-600">PODs</span> are collectibles
              </h2>
              <p>
                PODs are collectibles that represent open source contributions.
                They can be traded on the marketplace
                <span className="font-medium text-blue-600"> (tdb)</span> or
                used as a way to show off your skills and build a reputation.
              </p>
            </section>
            <section className="max-w-3xl text-left text-lg">
              <h2 className="mb-4 font-bespoke text-3xl font-bold">
                <span className="text-blue-600">PODs</span> are Unique Items
              </h2>
              <p>
                PODs are standard{" "}
                <span className="font-medium text-blue-600">
                  ERC-721 tokens
                </span>{" "}
                minted on the Ethereum blockchain.
              </p>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default About;
