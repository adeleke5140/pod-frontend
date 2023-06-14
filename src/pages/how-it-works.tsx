import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "~/components/layouts";

const HowItWorks: NextPage = () => {
  return (
    <>
      <Head>
        <title>How it works</title>
        <meta name="description" content="Proof of development" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div>
          <p className="mb-8 text-left font-bold text-blue-600 underline">
            How it works?
          </p>
          <div className="flex flex-col gap-16">
            <section className="max-w-2xl text-left">
              <h1 className="mb-4 font-bespoke text-3xl font-bold">
                How to reward{" "}
                <span className="text-blue-600">Contributors?</span>
              </h1>
              <p className="mb-2 text-lg">
                <Image
                  src="/../public/how-it-works.png"
                  alt="pod how it works image"
                  width="900"
                  height="400"
                />
                1. Github project owners can select one of their open source
                repositories.
              </p>
              <p className="text-lg">
                2. Upload art for the NFT and mention minimum contributions
                required to be eligible for minting.
              </p>
              <p className="text-lg">
                3. Submit the above details and this will create a unique URL
                that can be shared to mint NFTs
              </p>
            </section>
            <section className="max-w-3xl text-left text-lg">
              <h2 className="mb-4 font-bespoke text-3xl font-bold">
                How to claim{" "}
                <span className="text-blue-600">collectibles?</span>
              </h2>
              <p>
                If you have contributed to certain project and met the minimum
                contribution criteria, then you can simply verify and mint PoD
                NFTs.
              </p>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HowItWorks;
