import { create } from "zustand";
import axios from "axios";
import { githubCallbackURL, githubRepoURL } from "~/constants";

interface AuthState {
  loading: boolean;
  code: string;
  access_token: string;
  repos: UserRepo[];
  cache: { [key: string]: unknown };
  actions: {
    setCode: (code: string) => void;
    fetchAccessToken: () => Promise<void>;
    fetchRepos: () => Promise<void>;
    clearCache: () => void;
  };
}

interface UserDataServerResponse {
  data: UserData;
}

interface UserData {
  token: string;
  user: unknown;
  userID: unknown;
}

interface UserRepoServerResponse {
  success: boolean;
  data: UserRepoData;
}

interface UserRepo {
  name: string;
  link: string;
  isForked: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
  stargazersCount: number;
  watchersCount: number;
  forks: number;
}
interface UserRepoData {
  user: unknown;
  publicRepos: UserRepo[];
}

const useAuthStore = create<AuthState>((set, get) => ({
  loading: false,
  code: "",
  access_token: "",
  repos: [],
  cache: {},
  actions: {
    setCode: (code: string) => set((state) => ({ ...state, code })),

    fetchAccessToken: async () => {
      const code = get().code;
      const cache = get().cache;
      if (cache[code]) {
        console.log("using cached access token");
        const token = cache[code] as string;
        set((state) => ({ ...state, access_token: token }));
        return;
      }
      try {
        set((state) => ({ ...state, loading: true }));
        console.log("fetching access token🎉");
        const { data } = await axios.post<UserDataServerResponse>(
          githubCallbackURL,
          {
            code,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        console.log({
          data,
          token: data.data.token,
        });
        cache[code] = data.data.token;
        console.log(cache);
        set((state) => ({ ...state, loading: false }));
        set((state) => ({ ...state, access_token: data.data.token }));
        console.log("fetched access_token", data.data);
      } catch (e) {
        set((state) => ({ ...state, loading: false }));
        console.log(e);
      }
    },
    fetchRepos: async () => {
      const token = get().access_token;
      if (!token) return console.log("No token, can't make request ❌");
      try {
        console.log("fetching repos...🎉");
        const { data } = await axios.post<UserRepoServerResponse>(
          githubRepoURL,
          {
            token,
          }
        );

        const repos = data.data.publicRepos;
        set((state) => ({ ...state, repos }));
      } catch (e) {
        console.log(e);
      }
    },
    clearCache: () => {
      set((state) => ({ ...state, cache: {} }));
    },
  },
}));

export const useCode = () => useAuthStore((state) => state.code);
export const useAccessToken = () => useAuthStore((state) => state.access_token);
export const useAuthActions = () => useAuthStore((state) => state.actions);
export const useRepos = () => useAuthStore((state) => state.repos);
export const useLoading = () => useAuthStore((state) => state.loading);
