"use client";
import { useState } from "react";
import { getAuthCookie } from "./getAuthCookie";

const useFetch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const _fetch = async (
    url: string,
    {
      method = "GET",
      headers,
      body,
    }: { method?: string; headers?: {}; body?: string }
  ) => {
    setLoading(true);
    // console.log(await getAuthCookie());

    return fetch(url, {
      method,
      //   mode: "cors",
      // credentials: "include",
      headers,
      body,
    })
      .then(async (resp) => {
        if (resp.ok) return resp.json();
        const error = await resp.text();
        setLoading(false);
        setError(error);
      })
      .then((data) => {
        setLoading(false);
        return data;
      });
  };

  return { loading, error, _fetch };
};

export default useFetch;
