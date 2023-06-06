interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-transparent to-transparent font-supreme">
      <nav className="relative z-20 flex justify-around pt-4">
        <span className="rounded-b-2xl bg-blue-600 p-4 font-semibold text-white">
          POD
        </span>
        <ul className="flex gap-2">
          <li>
            <a
              href="#"
              className="cursor-pointer transition-colors hover:text-blue-600"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              className="cursor-pointer transition-colors hover:text-blue-600"
            >
              {" "}
              Issuers
            </a>
          </li>
          <li>
            <a
              href="#"
              className="cursor-pointer transition-colors hover:text-blue-600"
            >
              {" "}
              Builders
            </a>
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
        <div className="relative z-20"> {children}</div>
      </main>
      <footer className="absolute bottom-0 flex w-full items-center justify-center gap-2 divide-y">
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
