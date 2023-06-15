import { create } from "zustand";
import axios from "axios";
import { githubCallbackURL, githubRepoURL } from "~/constants";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../localStorage/localStorage";

interface AuthState {
  userId: string;
  loading: boolean;
  code: string;
  access_token: string;
  repos: UserRepo[];
  cache: { [key: string]: unknown };
  actions: {
    setCode: (code: string) => void;
    fetchAccessToken: () => Promise<void>;
    fetchRepos: () => Promise<void>;
    logout: () => void;
  };
}

interface UserDataServerResponse {
  data: UserData;
}

interface UserData {
  token: string;
  user: unknown;
  userId: string;
}

interface UserRepoServerResponse {
  success: boolean;
  data: UserRepoData;
}

export interface UserRepo {
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

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userId: "",
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
            set((state) => ({ ...state, userId: data.data.userId }));
            console.log("fetched access_token", data.data);
          } catch (e) {
            set((state) => ({ ...state, loading: false }));
            console.log(e);
          }
        },
        fetchRepos: async () => {
          const cache = get().cache;
          if (cache["repos"]) {
            console.log("using cached repos");
            const repos = cache["repos"] as UserRepo[];
            set((state) => ({ ...state, repos }));
            return;
          }
          const token = get().access_token;
          if (!token) return console.log("No token, can't make request ❌");
          try {
            set((state) => ({ ...state, loading: true }));
            console.log("fetching repos...🎉");
            const { data } = await axios.post<UserRepoServerResponse>(
              githubRepoURL,
              {
                token,
              }
            );

            const repos = data.data.publicRepos;
            set((state) => ({ ...state, loading: false }));
            set((state) => ({ ...state, repos }));
            cache["repos"] = repos;
          } catch (e) {
            set((state) => ({ ...state, loading: false }));
            console.log(e);
          }
        },
        logout: () => {
          set((state) => ({ ...state, cache: {} }));
          set((state) => ({ ...state, access_token: '' }))
        },
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ access_token: state.access_token }),
    }
  )
);

export const useCode = () => useAuthStore((state) => state.code);
export const useUserId = () => useAuthStore((state) => state.userId);
export const useAccessToken = () => useAuthStore((state) => state.access_token);
export const useAuthActions = () => useAuthStore((state) => state.actions);
export const useRepos = () => useAuthStore((state) => state.repos);
export const useLoading = () => useAuthStore((state) => state.loading);
export const useCache = () => useAuthStore((state) => state.cache);
