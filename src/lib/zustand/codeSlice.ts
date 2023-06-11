import { create } from "zustand";
import axios from "axios";
import { githubCallbackURL, githubRepoURL } from "~/constants";


interface AuthState {
  code: string;
  access_token: string;
  repos: unknown[];
  actions: {
    setCode: (code: string) => void;
    fetchAccessToken: () => Promise<void>;
    fetchRepos: () => Promise<void>;
  };
}

interface UserDataServerResponse {
  data: UserData;
}

interface UserData {
  success: boolean;
  data: {
    token: string;
    userId: string;
    user: {
      _id: string;
      isEnabled: boolean;
      email: null;
      fullname: string;
      username: string;
      twitter: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

interface UserRepoServerResponse {
  data: UserRepoData;
}

interface UserRepoData {
  success: boolean;
  data: {
    publicRepos: {
      name: string;
      link: string;
      isForked: boolean;
      description: string;
      createdAt: string;
      updatedAt: string;
      stargazersCount: number;
      watchersCount: number;
      forks: number;
    }[];
  };
}

const useAuthStore = create<AuthState>((set, get) => ({
  code: "",
  access_token: "",
  repos: [],
  actions: {
    setCode: (code: string) => set((state) => ({ ...state, code })),
    fetchAccessToken: async () => {
      const code = get().code;
      try {
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

        set((state) => ({ ...state, access_token: data.data.data.token }));
        console.log("fetched access_token", data.data);
      } catch (e) {
        console.log(e);
      }
    },
    fetchRepos: async () => {
      const token = get().access_token;
	  if(!token) return console.log("No token, can't make request ❌")
      try {
        console.log("fetching repos...🎉");
        const { data } = await axios.post<UserRepoServerResponse>(
          githubRepoURL,
          {
            token,
          }
        );

        const repos = data.data.data.publicRepos;
		set((state) => ({ ...state, repos }));
      } catch (e) {
        console.log(e);
      }
    },
  },
}));

export const useCode = () => useAuthStore((state) => state.code);
export const useAuthActions = () => useAuthStore((state) => state.actions);
export const useRepos = () => useAuthStore((state) => state.repos);
