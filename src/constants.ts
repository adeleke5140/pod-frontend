const clientID = process.env.NEXT_PUBLIC_CLIENT_ID as string;
const redirectURI = process.env.NEXT_PUBLIC_REDIRECT_URI as string;

export const redirectURL = `https://github.com/login/oauth/authorize?scope=user&client_id=${clientID}&redirect_uri=${redirectURI}`;
export const githubCallbackURL =
  "http://localhost:3058/user/v1-github-callback";
export const githubRepoURL =
  "http://localhost:3058/user/v1-get-public-repos-by-user";
export const requestProjectApprovalURL =
  "http://localhost:3058/user/v1-request-project-approval";
export const checkMintEligibilityURL = "http://localhost:3058/user/v1-is-user-allowed-to-mint";
export const domain = process.env.NEXT_PUBLIC_DOMAIN as string;
export const web3StorageToken = process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN;
export const walletConnectId = process.env
  .NEXT_PUBLIC_WALLET_CONNECT_ID as string;
