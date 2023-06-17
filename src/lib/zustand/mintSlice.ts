import { create } from "zustand";
import { checkMintEligibilityURL } from "~/constants";
import axios from 'axios'
import * as middleware from "zustand/middleware";

interface MintState {
  loading: boolean;
  pHash: string;
  code: string;
  walletAddress: string;
  mintEligibility: boolean;
  transactionHash: string;
  actions: {
    startLoading: () => void;
    stopLoading: () => void;
    setProjectHash: (pHash: string) => void;
    setCode: (code: string) => void;
    setWalletAddress: (walletAddress: string) => void;
    checkMintEligibility: () => Promise<void>;
  }
}

interface MintEligibilityServerResponse {
  success: boolean;
  data: {
    isAllowedToMint: boolean;
    transactionHash: string;
  }
}

export const useMintSlice = create<MintState>()(
  middleware.persist(
    (set, get) => ({
      loading: false,
      pHash: "",
      code: "",
      walletAddress: "",
      mintEligibility: false,
      transactionHash: "",
      actions: {
        startLoading: () => set((state) => ({ ...state, loading: true })),
        stopLoading: () => set((state) => ({ ...state, loading: false })),
        setProjectHash: (pHash) => set((state) => ({ ...state, pHash })),
        setCode: (code) => set((state) => ({ ...state, code })),
        setWalletAddress: (walletAddress) => set((state) => ({ ...state, walletAddress })),
        checkMintEligibility: async () => {
          const startLoading = get().actions.startLoading;
          const stopLoading = get().actions.stopLoading;
          startLoading()
          const { pHash, code, walletAddress } = get();
          try {
            const { data } = await axios.post<MintEligibilityServerResponse>(checkMintEligibilityURL, {
              projectHash: pHash,
              code,
              account: walletAddress
            })
            if (data.success) {
              stopLoading()
              set((state) => ({ ...state, mintEligibility: data.data.isAllowedToMint }))
              set((state) => ({ ...state, transactionHash: data.data.transactionHash }))
              set((state) => ({ ...state, pHash: "" }))
              console.log('Allowed to mint', "✅")
            } else {
              stopLoading()
              console.log('Not allowed to mint', "❌")
            }
          } catch (err) {
            stopLoading()
            console.error('Could not fetch Mint eligibility', err)
          }
        }
      }
    }),
    {
      name: "mint-storage",
      storage: middleware.createJSONStorage(() => localStorage),
      partialize: (state) => ({ pHash: state.pHash })
    }))

export const useMintLoading = () => useMintSlice((state) => state.loading)
export const useMintEligibility = () => useMintSlice((state) => state.mintEligibility)
export const useMintActions = () => useMintSlice((state) => state.actions)
export const useMintCode = () => useMintSlice((state) => state.code)
export const useMintTransactionHash = () => useMintSlice((state) => state.transactionHash)
export const useProjectHash = () => useMintSlice((state) => state.pHash)
