import axios from "axios";
import { create } from "zustand";
import { requestProjectApprovalURL } from "~/constants";
import type { CIDString } from "web3.storage";
import { useAuthStore } from "./codeSlice";

interface PodState {
  podCreationSuccess: boolean
  podCreationFailure: boolean
  podCreationProjectHash: string
  podDetails: {
    userId: string;
    projectName: string;
    signature: unknown;
    nftUri: CIDString;
    minContributions: number;
  } | null;
  actions: {
    setPodDetails: (podDetails: PodState["podDetails"]) => void;
    createPod: () => Promise<void>;
  };
}

interface PodCreationServerResponse {
  data: {
    success: boolean;
    data: {
      projectHash: string;
      transactionHash: string;
    }
    message: string;
  };
}

export const usePodSlice = create<PodState>()((set, get) => ({
  podCreationSuccess: true,
  podCreationFailure: false,
  podCreationProjectHash: "",
  podDetails: null,
  actions: {
    setPodDetails: (podDetails) => set({ podDetails }),
    createPod: async () => {
      const podDetails = get().podDetails;
      const { access_token } = useAuthStore.getState();
      if (!podDetails) {
        return;
      }
      try {
        console.log("creating pod🚀");
        const { data } = await axios.post<PodCreationServerResponse>(
          requestProjectApprovalURL,
          {
            ...podDetails,
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: `Bearer ${access_token}`,
            },
          }
        );
        if (data.data.success) {
          set((state) => ({ ...state, podCreationSuccess: true }))
          set((state) => ({ ...state, podCreationProjectHash: data.data.data.projectHash }))
          console.log("pod created🎉");
          console.log(data);
        } else {
          set((state) => ({ ...state, podCreationFailure: true }))
          console.log("pod creation failed👎");
          console.log(data);
          throw new Error("pod creation failed");
        }
      } catch (err) {
        console.error("Cannot create POD", err);
      }
    },
  },
}));

export const usePodActions = () => usePodSlice((state) => state.actions);
export const usePodCreationSuccess = () => usePodSlice((state) => state.podCreationSuccess);
export const usePodCreationFailure = () => usePodSlice((state) => state.podCreationFailure);
