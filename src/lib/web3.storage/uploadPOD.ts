import { Web3Storage } from "web3.storage";
import { web3StorageToken } from "~/constants";

function getAccessToken(): string {
  if (web3StorageToken) {
    return web3StorageToken;
  }
  throw new Error("No access token found");
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

export const uploadPOD = async (files: File[]) => {
  let pct = 0;

  const onRootCidReady = (cid: string) => {
    console.log(`uploading files with cid: ${cid}`);
  };

  const totalSize = files.map((f) => f.size).reduce((a, b) => a + b, 0);
  let uploaded = 0;

  const onStoredChunk = (size: number) => {
    uploaded += size;
    pct = 100 * (uploaded / totalSize);
    console.log(`Uploading... ${pct.toFixed(2)}% complete`);
  };

  const client = makeStorageClient();

  const cid = await client.put(files, {
    name: "POD",
    onRootCidReady,
    onStoredChunk,
    wrapWithDirectory: false,
  });
  console.log(cid);
  return { cid, pct };
};
