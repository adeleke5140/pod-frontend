const clientID = process.env.NEXT_PUBLIC_CLIENT_ID as string;
const clientIDMint = process.env.NEXT_PUBLIC_CLIENT_ID_MINT as string;
const redirectURI = process.env.NEXT_PUBLIC_REDIRECT_URI as string;
const redirectMintURI = process.env.NEXT_PUBLIC_REDIRECT_MINT_URI as string;

export const domain = process.env.NEXT_PUBLIC_API_URL as string;
export const redirectURL = `https://github.com/login/oauth/authorize?scope=user&client_id=${clientID}&redirect_uri=${redirectURI}`;
export const redirectMintURL = `https://github.com/login/oauth/authorize?scope=user&client_id=${clientIDMint}&redirect_uri=${redirectMintURI}`;
export const githubCallbackURL = `${domain}/user/v1-github-callback`;
export const githubRepoURL = `${domain}/user/v1-get-public-repos-by-user`;
export const requestProjectApprovalURL = `${domain}/user/v1-request-project-approval`;
export const checkMintEligibilityURL = `${domain}/user/v1-is-user-allowed-to-mint`;

export const callibrationRpc = `https://filecoin-calibration.chainup.net/rpc/v1`;
export const callibrationChainId = 12;
export const podContract = "0x7748054C55C0b38e5Bd33de97E00141D542a54a7";
export const web3StorageToken = process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN;
export const walletConnectId = process.env
  .NEXT_PUBLIC_WALLET_CONNECT_ID as string;
