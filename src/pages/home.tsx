import { type NextPage } from "next";
import Head from "next/head";
import Layout from "~/components/layouts";
import { ArrowRight, UserCheck } from "react-feather";
import Link from "next/link";
import { redirectURL } from '../constants'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const router = useRouter()
  const [code, setCode] = useState('')

  useEffect(() => {
    const code = router.query.code
    if(code){
      setCode(code)
    }
  },[router])
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Proof of development" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex text-left flex-col gap-8 mt-16">
          <h1 className="text-7xl font-bold font-bespoke">
          {code ? "Welome to POD!" : "Authorize"}
          </h1>
          <a
            href={redirectURL}
            className="group flex self-start cursor-pointer gap-2 rounded-3xl bg-blue-600 px-5 py-3 text-xl font-semibold text-white transition-colors ease-out hover:bg-blue-700 disabled:opacity-50"
          >
            {code ? 'Authorized' : 'Authorize with Github'}
            {!code ? <ArrowRight className="transition-transform group-hover:translate-x-1" /> : <UserCheck/>}
          </a>
          code: {code}
        </div>
        <div className="text-left">
          <h2 className="text-3xl font-semibold">Repositories</h2>
          <p className="text-md">Select one that you would like to get contributions for and reward devs with PODs</p>

        </div>
      </Layout>
    </>
  );
};

export default Home;
