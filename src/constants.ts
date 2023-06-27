import { env } from "./env.mjs";
const clientID = env.NEXT_PUBLIC_CLIENT_ID;
const clientIDMint = env.NEXT_PUBLIC_CLIENT_ID_MINT;
const redirectURI = env.NEXT_PUBLIC_CLIENT_REDIRECT_URI;
const redirectMintURI = env.NEXT_PUBLIC_REDIRECT_MINT_URI;
export const web3StorageToken = env.NEXT_PUBLIC_WEB3STORAGE_TOKEN;
export const walletConnectId = env.NEXT_PUBLIC_WALLET_CONNECT_ID;

export const mintDomain = env.NEXT_PUBLIC_DOMAIN;
export const apiUrl = env.NEXT_PUBLIC_API_URL;
export const redirectURL = `https://github.com/login/oauth/authorize?scope=user&client_id=${clientID}&redirect_uri=${redirectURI}`;
export const redirectMintURL = `https://github.com/login/oauth/authorize?scope=user&client_id=${clientIDMint}&redirect_uri=${redirectMintURI}`;
export const githubCallbackURL = `${apiUrl}/user/v1-github-callback`;
export const githubRepoURL = `${apiUrl}/user/v1-get-public-repos-by-user`;
export const requestProjectApprovalURL = `${apiUrl}/user/v1-request-project-approval`;
export const checkMintEligibilityURL = `${apiUrl}/user/v1-is-user-allowed-to-mint`;

export const callibrationRpc = `https://filecoin-calibration.chainup.net/rpc/v1`;
export const callibrationChainId = 12;
export const podContract = "0x7748054C55C0b38e5Bd33de97E00141D542a54a7";
