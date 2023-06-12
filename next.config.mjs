/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
// await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  env: {
    client_id: "f60f190806923e18f3ed",
    redirect_uri: "http://localhost:3000/home",
    web3StorageToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIxNjg3NDE5RDgzRjgyNTBkNzI1RjliOTM2ZjQxNmMxMTVkRGNkQUMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODY1ODg2MzM2MjQsIm5hbWUiOiJwZG8ifQ.1JSa-uuvzt4_EXA8TqvhFL9nF12LDwVeosZpWAwmprM",
  },
};
export default config;
