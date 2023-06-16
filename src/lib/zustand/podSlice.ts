import axios from "axios";
import { create } from "zustand";
import { requestProjectApprovalURL } from "~/constants";
import type { CIDString } from "web3.storage";
import { useAuthStore } from "./codeSlice";

//pHash - projectHash
//tHash - transactionHash

interface PodState {
  loading: boolean;
  podCreationSuccess: boolean
  podCreationFailure: boolean
  podCreationDetails: {
    pHash: string;
    tHash: string
  }
  podDetails: {
    projectName: string;
    signature: unknown;
    nftUri: CIDString;
    minContributions: number;
  } | null;
  actions: {
    startLoading: () => void;
    stopLoading: () => void;
    setPodDetails: (podDetails: PodState["podDetails"]) => void;
    createPod: () => Promise<void>;
  };
}

interface PodCreationServerResponse {
  success: boolean;
  data: {
    projectHash: string;
    transactionHash: string;
  }
  message: string;
}

export const usePodSlice = create<PodState>()((set, get) => ({
  loading: false,
  podCreationSuccess: false,
  podCreationFailure: false,
  podCreationDetails: {
    pHash: "",
    tHash: ""
  },
  podDetails: null,
  actions: {
    setPodDetails: (podDetails) => set({ podDetails }),
    startLoading: () => set((state) => ({ ...state, loading: true })),
    stopLoading: () => set((state) => ({ ...state, loading: false })),
    createPod: async () => {
      const podDetails = get().podDetails;
      const stopLoading = get().actions.stopLoading;
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
        if (data.success) {
          stopLoading()
          set((state) => ({ ...state, podCreationSuccess: true }))
          set((state) => ({
            ...state, podCreationDetails: {
              ...state.podCreationDetails,
              pHash: data.data.projectHash,
            }
          }))
          set((state) => ({
            ...state, podCreationDetails: {
              ...state.podCreationDetails,
              tHash: data.data.transactionHash,
            }
          }))
          console.log("pod created🎉");
          console.log(data);
        } else {
          stopLoading()
          set((state) => ({ ...state, podCreationFailure: true }))
          console.log("pod creation failed👎");
          console.log(data);
          throw new Error("pod creation failed");
        }
      } catch (err) {
        stopLoading()
        console.error("Cannot create POD", err);
      }
    },
  },
}));

export const usePodActions = () => usePodSlice((state) => state.actions);
export const usePodCreationSuccess = () => usePodSlice((state) => state.podCreationSuccess);
export const usePodCreationFailure = () => usePodSlice((state) => state.podCreationFailure);
export const usePodCreationDetails = () => usePodSlice((state) => state.podCreationDetails);
export const useIsCreatingPod = () => usePodSlice((state) => state.loading);
