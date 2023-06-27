import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_CLIENT_ID: z.string().min(1),
    NEXT_PUBLIC_CLIENT_ID_MINT: z.string(),
    NEXT_PUBLIC_CLIENT_REDIRECT_URI: z.string().url(),
    NEXT_PUBLIC_REDIRECT_MINT_URI: z.string().url(),
    NEXT_PUBLIC_WEB3STORAGE_TOKEN: z.string().min(1),
    NEXT_PUBLIC_WALLET_CONNECT_ID: z.string().min(1),
    NEXT_PUBLIC_DOMAIN: z.string().url(),
    NEXT_PUBLIC_API_URL: z.string().url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
    NEXT_PUBLIC_CLIENT_ID_MINT: process.env.NEXT_CLIENT_ID_MINT,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_REDIRECT_MINT_URI: process.env.NEXT_PUBLIC_REDIRECT_MINT_URI,
    NEXT_PUBLIC_CLIENT_REDIRECT_URI: process.env.NEXT_PUBLIC_REDIRECT_URI,
    NEXT_PUBLIC_WALLET_CONNECT_ID: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID,
    NEXT_PUBLIC_WEB3STORAGE_TOKEN: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN,
  },
});
