import { useRepos, useLoading } from "~/lib/zustand/codeSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import { SkeletonCard } from "../skeleton/skeletonCard";
import { useEffect, useState } from "react";
import { Copy } from "react-feather";
import { domain } from "~/constants";
import { useCopyToClipboard } from "usehooks-ts";
import toast from "react-hot-toast";

export const Repos = () => {
  const [repoDisplay, setRepoDisplay] = useState<"all" | "pod">("all");
  const repos = useRepos();
  const loading = useLoading();
  const router = useRouter();
  const [value, copy] = useCopyToClipboard();
  const [copiedRepo, setCopiedRepo] = useState<string | null>(null);

  function copyLink(hash: string) {
    const repo = repos.find((repo) => repo.projectHash === hash);
    const url = repo && `${domain}/mint?pHash=${repo.projectHash}`;
    if (url) {
      void copy(url);
      setCopiedRepo(hash);
      value && toast.success("Mint URL copied to clipboard!");
    }
  }

  useEffect(() => {
    if (copiedRepo) {
      const id = setTimeout(() => {
        setCopiedRepo(null);
      }, 3000);
      return () => clearTimeout(id);
    }
  }, [copiedRepo]);

  const repoWithPod = repos.filter((repo) => repo.isAllowedMint);

  return (
    <>
      <div className="text-left">
        <h2 className="text-2xl font-semibold">Repositories</h2>
        <p className="mb-8 text-base">
          Select a repositories to associate with your POD.
        </p>
        <ul className="mb-4 flex gap-4">
          <button
            onClick={() => setRepoDisplay("all")}
            className={`cursor-pointer rounded-lg bg-blue-50 px-2 py-1 font-semibold transition-all hover:bg-blue-100 ${repoDisplay === "all"
              ? "bg-blue-100 text-blue-600 font-bold"
              : ""
              }`}
          >
            All repos
          </button>
          <button
            onClick={() => setRepoDisplay("pod")}
            className={`cursor-pointer rounded-lg bg-blue-50 px-2 py-1 font-semibold transition-all hover:bg-blue-100 ${repoDisplay === "pod"
              ? "bg-blue-100  text-blue-600 opacity-100"
              : ""
              }`}
          >
            POD repos
          </button>
        </ul>
        <div className="grid gap-5 md:grid-cols-2">
          {!repos.length && !loading && <p>No repos yet...</p>}
          {loading && <SkeletonCard />}
          {repoDisplay === "all"
            ? repos.map((repo) => (
              <Link
                href={{
                  pathname: `/repos/${repo.name}`,
                  query: { ...router.query },
                }}
                passHref={true}
                shallow={true}
                key={repo.name}
                className={`${repo.isAllowedMint ? "pointer-events-none" : ""
                  } relative mb-4 flex h-auto flex-col gap-3 rounded-lg border-2 border-gray-200 p-6 font-supreme shadow-transparent transition-colors hover:border-blue-600 hover:bg-slate-50`}
              >
                <h3 className="text-xl font-semibold">{repo.name}</h3>
                {repo.description ? (
                  <span>Details: {repo.description}</span>
                ) : (
                  <span>No description</span>
                )}
                <div className="absolute right-4 top-4">
                  {repo.isAllowedMint ? (
                    <div className="flex flex-row-reverse items-center justify-center gap-2 rounded-lg bg-blue-100 px-2 py-1 text-sm font-medium text-blue-600">
                      <span>Pod assigned</span>
                      <svg
                        viewBox="0 0 22 22"
                        aria-label="Pod created"
                        role="img"
                        className="h-4 w-4 fill-blue-500 text-blue-500"
                        data-testid="icon-verified"
                      >
                        <g>
                          <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
                        </g>
                      </svg>
                    </div>
                  ) : null}
                </div>
              </Link>
            ))
            : repoWithPod.map((repo) => (
              <div
                key={repo.name}
                className="relative mb-4 flex h-auto flex-col gap-3 rounded-lg border-2 border-gray-200 p-6 font-supreme shadow-transparent transition-colors hover:border-blue-600 hover:bg-slate-50"
              >
                <h3 className="text-xl font-semibold">{repo.name}</h3>
                {repo.description ? (
                  <p>Details: {repo.description}</p>
                ) : (
                  <p>No description</p>
                )}
                <div className="absolute right-4 top-4 flex flex-col gap-2 font-supreme text-sm">
                  <button
                    onClick={() =>
                      copyLink(repo.projectHash)
                    }
                    className="flex items-center gap-2 self-end rounded-lg bg-blue-100 px-2 py-1 font-medium text-blue-600"
                  >
                    <Copy size="14px" />
                    {copiedRepo === repo.projectHash ? "Copied!" : "Copy Mint Url"}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
