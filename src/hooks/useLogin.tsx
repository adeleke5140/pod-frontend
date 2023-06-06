import { useState } from "react";
// import { useRouter } from "next/router";
import axios from "axios";

const base_url = "http://localhost:3058";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //   const router = useRouter();

  const login = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${base_url}/user/v1-github-callback`, {
        code: "githubcode",
      });

      if (res.status === 200) {
        console.log(res.data);
        setIsLoading(false);
        setError(null);
      }
    } catch (err) {
      setIsLoading(false);
      if (axios.isAxiosError(err)) {
        console.error(err);
        setError(err);
      } else {
        console.log("Unexpected error", err);
        return "An unexpected error occurred";
      }

      console.error(err);
    }
  };

  return { login, error, isLoading };
};
