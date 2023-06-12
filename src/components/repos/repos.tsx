import { useRepos, useLoading } from "~/lib/zustand/codeSlice";
import Link from "next/link";
import { Spinner } from "../spinner";
import { useRouter } from "next/router";

const Repos = () => {
  const repos = useRepos();
  const loading = useLoading();
  const router = useRouter();
  console.log(repos);
  return (
    <>
      <div className="text-left">
        <h2 className="text-3xl font-semibold">Repositories</h2>
        <p className="mb-8 text-lg">
          Once authorized, select a repositories to associate with your POD.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {!repos.length && !loading && <p>No repos yet...</p>}
          {loading && (
            <>
              <Spinner size="sm" />
            </>
          )}
          {repos.map((repo) => (
            <Link
              href={{
                pathname: `/repos/${repo.name}`,
                query: { ...router.query },
              }}
              passHref={true}
              shallow={true}
              key={repo.name}
              className="mb-4 flex h-auto flex-col gap-3 rounded-lg border-2 border-gray-200 p-6 font-supreme shadow-transparent transition-colors hover:border-blue-600 hover:bg-slate-50"
            >
              <h3 className="text-2xl font-semibold">{repo.name}</h3>
              {repo.description ? (
                <span>Details: {repo.description}</span>
              ) : (
                <span>No description</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export { Repos };
