import { useRepos, useLoading } from "~/lib/zustand/codeSlice";
import { ButtonCard, Heading, Text, Spinner } from "degen";
import Link from "next/link";

const Repos = () => {
  const repos = useRepos();
  const loading = useLoading();
  console.log(repos);
  return (
    <>
      <div className="text-left">
        <h2 className="text-3xl font-semibold">Repositories</h2>
        <p className="text-md mb-8">
          Select one that you would like to get contributions for and reward
          devs with PODs
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {loading && (
            <>
              <Spinner color="blue" />
            </>
          )}
          {repos.map((repo) => (
            <Link
              href={`/repos/${repo.name}`}
              key={repo.name}
              className="mb-4 flex h-auto flex-col gap-3 rounded-lg border-2 border-gray-200 p-6 font-supreme shadow-transparent transition-colors hover:border-blue-600 hover:bg-slate-50"
            >
              <h3>
                <span className="text-sm">repo:</span>{" "}
                <span className="text-xl font-bold">{repo.name}</span>
              </h3>
              {repo.description ? (
                <span>details: {repo.description}</span>
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
