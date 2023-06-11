import Link from "next/link";
interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 via-transparent to-transparent px-4 font-supreme md:px-8">
      <nav className="relative z-20 mx-auto my-0 flex w-full max-w-6xl justify-between pt-4 text-lg">
        <Link
          href="/"
          className="rounded-b-2xl bg-blue-600 p-4 font-semibold text-white"
        >
          POD
        </Link>
        <ul className="flex gap-2">
          <li>
            <Link
              href="/about"
              className="cursor-pointer rounded-lg p-1 px-2 transition-colors hover:bg-slate-200 "
            >
              About
            </Link>
          </li>
        </ul>
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
        <span>©EthGlobal 2023.</span>
        <span>
          Built by{" "}
          <a href="" className="text-blue-600">
            lovelace{" "}
          </a>
          and{" "}
          <a href="" className="text-blue-600">
            kenny
          </a>
        </span>
      </footer>
    </div>
  );
}

export default Layout;
