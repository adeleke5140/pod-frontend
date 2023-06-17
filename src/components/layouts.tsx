import { useChains } from "connectkit";
import Link from "next/link";
import { useRouter } from "next/router";
interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const chains = useChains()
  const router = useRouter()
  const showNavInfo = router.asPath === '/' || router.asPath === '/about' || router.asPath === '/how-it-works' || router.asPath === '/create' || router.asPath === '/how-it-works'
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 via-transparent to-transparent px-4 font-supreme md:px-8">
      <nav className="relative z-20 mx-auto my-0 flex w-full max-w-6xl justify-between pt-4 text-lg">
        <Link
          href="/"
          className="rounded-b-2xl bg-blue-600 p-4 font-semibold text-white"
        >
          POD
        </Link>
        {showNavInfo ? <ul className="flex gap-2">
          <li>
            <Link
              href="/how-it-works"
              className="cursor-pointer rounded-lg p-1 px-2 transition-colors hover:bg-slate-200 "
            >
              How it works
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="cursor-pointer rounded-lg p-1 px-2 transition-colors hover:bg-slate-200 "
            >
              About
            </Link>
          </li>
        </ul> : null}
        {
          router.route === '/mint' ? <a className="text-sm underline text-blue-500 font-medium" target="_blank" rel="noopener noreferrer" href="https://chainlist.org/?search=fil&testnets=true">Add Filecoin testnet to metamask</a> : null
        }
        {
          router.route === '/home' ? chains.map(chain => (
            <span key={chain.id}>
              <span className="opacity-50 text-base">
                Supported network:{' '}
              </span>
              <span className="bg-blue-100 text-base inset-2 rounded-lg px-2 py-2 font-bold text-blue-600">{chain.name}</span>
            </span>))
            : null
        }
      </nav>
      <main>
        <div className="relative isolate z-10">
          <div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
            <svg
              className="h-[60rem] w-[100rem] flex-none stroke-blue-600 opacity-20"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
                  width="200"
                  height="200"
                  x="50%"
                  y="50%"
                  patternUnits="userSpaceOnUse"
                  patternTransform="translate(-100 0)"
                >
                  <path d="M.5 200V.5H200" fill="none"></path>
                </pattern>
              </defs>
              <svg x="50%" y="50%" className="overflow-visible fill-blue-50">
                <path
                  d="M-300 0h201v201h-201Z M300 200h201v201h-201Z"
                  stroke-width="0"
                ></path>
              </svg>
              <rect
                width="100%"
                height="100%"
                stroke-width="0"
                fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)"
              ></rect>
            </svg>
          </div>
        </div>
        <div className="relative z-20 mx-auto my-0 mt-12 flex max-w-6xl flex-col gap-8 text-center">
          {children}
        </div>
      </main>
      <footer className="mt-auto flex w-full items-center justify-center gap-2 divide-y">
        <span>EthGlobal | HackFS 2023</span>
        <span>
          backend and contract by{" "}
          <a href="" className="text-blue-600">
            lovelace
          </a>
          , frontend by{" "}
          <a href="" className="text-blue-600">
            kenny
          </a>
        </span>
      </footer>
    </div>
  );
}

export default Layout;
