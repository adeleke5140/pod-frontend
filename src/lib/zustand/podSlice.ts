import axios from "axios";
import { create } from "zustand";
import { requestProjectApprovalURL } from "~/constants";
import type { CIDString } from "web3.storage";
import { useAuthStore } from "./codeSlice";
import * as middleware from "zustand/middleware";

//pHash - projectHash
//tHash - transactionHash

interface PodState {
  loading: boolean;
  podCreation: boolean;
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
    createPod: () => Promise<{ created: "success", message: string } | { created: 'failed', message: string } | undefined>;
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

export const usePodSlice = create<PodState>()(
  middleware.persist(
    (set, get) => ({
      loading: false,
      podCreation: false,
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
            console.log(podDetails);
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
              set(state => ({ ...state, podCreation: true }))
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
              return { created: 'success', message: data.message }
            } else {
              stopLoading()
              console.log("pod creation failed👎");
              console.log(data);
              return { created: 'failed', message: data.message }
            }

          } catch (err) {
            stopLoading()
            console.error("Cannot create POD", err);
          }
        },
      },
    }), {
    name: "pod-storage",
    storage: middleware.createJSONStorage(() => localStorage),
    partialize: (state) => ({ podCreatioinDetails: state.podCreationDetails })
  }));

export const usePodActions = () => usePodSlice((state) => state.actions);
export const usePodCreationDetails = () => usePodSlice((state) => state.podCreationDetails);
export const useIsCreatingPod = () => usePodSlice((state) => state.loading);
