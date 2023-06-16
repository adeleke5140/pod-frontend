import { ConnectKitButton } from "connectkit"
import { useEffect, useState } from "react"
import Layout from "~/components/layouts"
import { redirectURL } from "~/constants"
import { useRouter } from "next/router"
import { ArrowRight } from "react-feather"
import { useMintActions, useMintCode, useMintEligibility, useMintLoading, useMintTransactionHash } from "~/lib/zustand/mintSlice"
import * as Form from "@radix-ui/react-form";
import { Spinner } from "~/components/spinner"
import toast from "react-hot-toast"

// create another store
// it's gonna store the hash we get from the url
// it's gonna store the code

const MintPage = () => {
  const router = useRouter()
  const code = useMintCode()
  const loading = useMintLoading()
  const mintEligibility = useMintEligibility()
  const transactionHash = useMintTransactionHash()
  const { setProjectHash, setCode, setWalletAddress, checkMintEligibility } = useMintActions()
  const [mintState, setMintState] = useState('Check eligibility')

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
      toast.success('You are eligible')
      toast.success('NFT Minted to your wallet address')
    }
  }, [mintEligibility])

  async function handleMint(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as unknown as string


    setWalletAddress(data)
    await checkMintEligibility()
  }

  return (
    <Layout>
      <div className="flex flex-col gap-4 max-w-xl mx-auto my-0">
        <h1 className="font-bespoke text-7xl font-bold">Mint your <span className="text-blue-500">POD</span></h1>
        <div className="flex justify-center align-center">
          {code ? <a
            href={redirectURL}
            className="text-md group flex cursor-pointer gap-2 self-start rounded-3xl bg-blue-600 px-4 py-2 font-semibold text-white transition-colors ease-out hover:bg-blue-700 disabled:opacity-50"
          >
            <span className="font-supreme">Connect Github</span>
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </a>
            :
            <div className="font-supreme">
              <p className="font-medum text-lg rounded-3xl border border-gray-50 hover:border-gray-100 transition-colors">Logged In</p>
            </div>
          }
        </div>
        <div className="mt-6">
          {code ?
            <Form.Root className="flex flex-col gap-4" onSubmit={void handleMint}>
              <Form.Field name="wallet-adress">
                <div className="flex items-baseline justify-between">
                  <Form.Label className="text-[15px] font-medium leading-[35px] font-supreme">Wallet Address</Form.Label>
                  <Form.Message className="text-[13px] text-red-500 opacity-[0.9]" match="valueMissing">
                    Please enter your wallet address or ens name
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    className="selection:color-black box-border inline-flex h-[50px] w-full resize-none appearance-none items-center justify-center rounded-xl p-[10px] text-xl leading-none shadow-[0_0_0_1.2px] shadow-gray-400 outline-none selection:bg-blue-100  focus:ring-2 focus:ring-blue-500"
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
                      <Spinner size="sm" /> <span>verifying...</span>
                    </>
                  ) : (
                    <span>{mintState}</span>
                  )}
                  {!loading ? (
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
            <h3 className="text-sm text-blue-500 font-medium">Check out on block explorer</h3>
            <p className="font-supreme text-base">Transaction Hash: {transactionHash}</p>
          </div>
          : null}
      </div>
    </Layout>
  )
}

export default MintPage
