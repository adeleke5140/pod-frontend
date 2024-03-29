import { useChains } from "connectkit"
import { useEffect, useState } from "react"
import Layout from "~/components/layouts"
import { redirectMintURL } from "~/constants"
import { useRouter } from "next/router"
import { ArrowRight } from "react-feather"
import { useMintActions, useMintCode, useMintEligibility, useMintLoading, useMintTransactionHash, useProjectHash } from "~/lib/zustand/mintSlice"
import * as Form from "@radix-ui/react-form";
import { Spinner } from "~/components/spinner"
import toast from "react-hot-toast"
import { User } from 'react-feather'
import { viemClient } from "~/lib/viem/client"
import { normalize } from "viem/ens"

const MintPage = () => {
  const router = useRouter()
  const code = useMintCode()
  const loading = useMintLoading()
  const mintEligibility = useMintEligibility()
  const transactionHash = useMintTransactionHash()
  const { setProjectHash, setCode, setWalletAddress, checkMintEligibility } = useMintActions()
  const [mintState, setMintState] = useState('Check eligibility')
  const chains = useChains()


  useEffect(() => {
    const pHash = router.query.pHash
    if (pHash) {
      setProjectHash(pHash as string)
    }
  }, [router, setProjectHash])

  useEffect(() => {
    const URLcode = router.query.code
    if (URLcode && !Array.isArray(URLcode)) {
      setCode(URLcode)
    }
  }, [router, setCode])

  useEffect(() => {
    if (mintEligibility) {
      setMintState('Minted')
    }
  }, [mintEligibility])


  async function handleMint(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as unknown as { 'wallet-address': string }


    if (data['wallet-address'].includes('.eth')) {
      const address = await viemClient.getEnsAddress({
        name: normalize(data['wallet-address']),
      })
      setWalletAddress(address as string)
    } else {
      setWalletAddress(data['wallet-address'])
    }
    const res = await checkMintEligibility()
    if (res?.created === 'success') {
      toast.success('You are eligible')
      toast.success('NFT Minted to your wallet address')
    } else if (res?.created === 'failed') {
      toast.error(res.message)
      toast.error(`You haven't made the required contribution to the project`)
    } else {
      toast.error('Something went wrong, try again')
      toast.error('Get the original mint URL and try again')
    }
  }

  return (
    <Layout>
      <div className="flex flex-col gap-4 max-w-[25rem] mx-auto my-0">
        <div>
          <h1 className="font-bespoke text-7xl font-bold">Mint <span className="text-blue-500">POD</span></h1>
          <div className="text-center mt-2">
            <span className="opacity-50 text-sm">Supported Network:</span>{' '}
            {chains.map(chain => (
              <code className="bg-gray-100 text-xs inset-2 rounded-lg px-2 py-2" key={chain.id}>{chain.name}</code>
            ))}
          </div>
        </div>
        <div className="flex justify-center align-center">
          {!code ? <a
            href={redirectMintURL}
            className="text-md group flex cursor-pointer gap-2 self-start rounded-3xl bg-blue-600 px-4 py-2 font-semibold text-white transition-colors ease-out hover:bg-blue-700 disabled:opacity-50"
          >
            <span className="font-supreme">Connect Github</span>
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </a>
            :
            <div className="font-supreme">
              <p className="font-medium bg-blue-100 flex gap-2 font-medium items-center justify-center  text-lg rounded-lg text-blue-500 px-2 transition-colors"><User size="14px" /> Logged In</p>
            </div>
          }
        </div>
        <div className="mt-6">
          {code ?
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            <Form.Root className="flex flex-col gap-4" onSubmit={handleMint}>
              <Form.Field name="wallet-address">
                <div className="flex items-baseline justify-between">
                  <Form.Label className="text-[15px] font-medium leading-[35px] font-supreme">Wallet Address</Form.Label>
                  <Form.Message className="text-[13px] text-red-500 opacity-[0.9]" match="valueMissing">
                    Please enter your wallet address or ens name
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    className="selection:color-black pl-4 text-base font-supreme box-border inline-flex h-[50px] w-full resize-none appearance-none items-center justify-center rounded-xl p-[10px] leading-none shadow-[0_0_0_1.2px] shadow-gray-400 outline-none selection:bg-blue-100  focus:ring-2 focus:ring-blue-500"
                    type="text"
                    required
                  />
                </Form.Control>
              </Form.Field>
              <Form.Submit asChild>
                <button
                  type="submit"
                  disabled={loading || mintState === 'Minted'}
                  className="group flex cursor-pointer items-center justify-center gap-2  rounded-3xl bg-blue-600 px-5 py-3 text-xl font-semibold text-white transition-colors ease-out hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" /> <span>Verifying...</span>
                    </>
                  ) : (
                    <span>{mintState}</span>
                  )}
                  {!loading || mintState !== 'minted' ? (
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  ) : null}
                </button>
              </Form.Submit>
            </Form.Root>
            :
            null
          }
        </div>
        {transactionHash ?
          <div className="text-left mt-4 bg-gray-100 inset-2 rounded-lg px-4 py-2">
            <h3 className="text-sm text-blue-500 font-medium"><a href={`https://calibration.filfox.info/en/message/${transactionHash}`} target="_blank" rel="noopener noreferrer"> Check out on filecoin block explorer</a></h3>
          </div>
          : null}
      </div>
    </Layout>
  )
}

export default MintPage
