import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>POD</title>
        <meta name="description" content="Proof of development" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen">Proof of development</main>
      <footer>
        by <a href="">Kenny</a> and <a href="">lovelace</a>
      </footer>
    </>
  );
};

export default Home;
