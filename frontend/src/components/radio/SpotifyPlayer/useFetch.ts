"use client";
import { redirect } from "next/navigation";
import { BASE_URL } from "@/lib/const";
import { useState, useCallback, useEffect } from "react";
import { AuthData } from "./types";

const refreshUrl = BASE_URL + "apps/radio/refresh";

class SpotifyClient {
  authData: AuthData | null;
  setLoading: (arg0: boolean) => void;
  setError: (arg0: string) => void;

  constructor(
    setLoading: (arg0: boolean) => void,
    setError: (arg0: string) => void
  ) {
    this.authData = JSON.parse(localStorage.getItem("authData") || "");
    this.setLoading = setLoading;
    this.setError = setError;
  }

  getAuthHeader() {
    return `Bearer ${this.authData?.access_token}`;
  }

  async refresh_token() {
    const { refresh_token } = this.authData || {};
    if (refresh_token === "undefined") {
      // if the token is invalid, remove any trace
      localStorage.removeItem("authData");
      redirect("/apps/radio");
    }
    if (refresh_token) {
      // if the token exists, attempt refreshing
      fetch("/api/radio/refresh_token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token }),
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          // if the request failed, remove any trace
          localStorage.removeItem("authData");
          return;
        })
        .then((data) => {
          if (!data) {
            return;
          }
          localStorage.setItem("authData", JSON.stringify(data));
          redirect("/apps/radio/player");
        });
    }
  }

  async get(url: string): Promise<any> {
    this.setLoading(true);
    const resp = await fetch(url, { cache: "no-cache" });
    if (resp.status === 401) this.refresh_token();
    const data = await resp.json();
    this.setLoading(false);
    return data;
  }

  async post(url: string, body?: string): Promise<any> {
    this.setLoading(true);
    const resp = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.getAuthHeader(),
      },
      body: body,
    });
    if (resp.status === 401) this.refresh_token();
    const data = await resp.json();
    this.setLoading(false);
    return data;
  }

  async put(url: string, body?: string): Promise<any> {
    this.setLoading(true);
    const resp = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.getAuthHeader(),
      },
      body: body,
    });
    if (resp.status === 401) this.refresh_token();
    const data = await resp.json();
    this.setLoading(false);
    return data;
  }

  async delete(url: string, body?: string): Promise<any> {
    this.setLoading(true);
    const resp = await fetch(url, {
      cache: "no-cache",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.getAuthHeader(),
      },
      body: body,
    });
    if (resp.status === 401) this.refresh_token();
    const data = await resp.json();
    this.setLoading(false);
    return data;
  }
}

export const useRefreshTokenFetch = () => {
  // const [authData, setAuthData] = useState<AuthData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);
  const client = new SpotifyClient(setLoading, setError);
  const fetchData = client.get;
  const postData = client.post;
  const putData = client.put;
  const deleteData = client.delete;

  // useEffect(() => {
  //   setAuthData(JSON.parse(localStorage.getItem("authData") || ""));
  //   client.setAuthData(authData);
  // }, []);

  return { loading, error, fetchData, putData, postData, deleteData };

  // const fetchData = useCallback(
  //   async (url: string, authData: AuthData, applyData: (arg0: any) => void) => {
  //     // async (url, authData, applyData) => {
  //     setLoading(true);
  //     try {
  //       const res = await fetch(url, {
  //         cache: "no-store",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + authData.access_token,
  //         },
  //       });
  //       if (res.status === 401) {
  //         window.location.href =
  //           refreshUrl + `?refresh_token=${authData.refresh_token}`;
  //       }
  //       const data = await res.json();
  //       // data;
  //       // console.log("");
  //       applyData(data);
  //     } catch (error) {
  //       setError(error);
  //       console.log(error);
  //     }
  //     setLoading(false);
  //   },
  //   []
  // );

  // const putData = useCallback(
  //   async (
  //     url: string,
  //     authData: AuthData,
  //     applyData: (arg0: any) => void,
  //     body?: string
  //   ) => {
  //     // async (url, authData, body, applyData) => {
  //     setLoading(true);
  //     try {
  //       const res = await fetch(url, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + authData.access_token,
  //         },
  //         body: body,
  //       });
  //       if (res.status === 401) {
  //         window.location.href =
  //           refreshUrl + `?refresh_token=${authData.refresh_token}`;
  //       }
  //       const data = await res.json();
  //       applyData(data);
  //     } catch (error) {
  //       setError(error);
  //       console.log(error);
  //     }
  //     setLoading(false);
  //   },
  //   []
  // );

  // const postData = useCallback(
  //   async (
  //     url: string,
  //     authData: AuthData,
  //     applyData: (arg0: any) => void,
  //     body?: string
  //   ) => {
  //     // async (url, authData, body, applyData) => {
  //     setLoading(true);
  //     try {
  //       const res = await fetch(url, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + authData.access_token,
  //         },
  //         body: body,
  //       });
  //       if (res.status === 401) {
  //         window.location.href =
  //           refreshUrl + `?refresh_token=${authData.refresh_token}`;
  //       }
  //       const data = await res.json();
  //       applyData(data);
  //     } catch (error) {
  //       setError(error);
  //       console.log(error);
  //     }
  //     setLoading(false);
  //   },
  //   []
  // );

  // const deleteData = useCallback(
  //   async (
  //     url: string,
  //     authData: AuthData,
  //     body: string,
  //     applyData: (arg0: any) => void
  //   ) => {
  //     // async (url, authData, body, applyData) => {
  //     setLoading(true);
  //     try {
  //       const res = await fetch(url, {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + authData.access_token,
  //         },
  //         body: body,
  //       });
  //       if (res.status === 401) {
  //         window.location.href =
  //           refreshUrl + `?refresh_token=${authData.refresh_token}`;
  //       }
  //       const data = await res.json();
  //       applyData(data);
  //     } catch (error) {
  //       setError(error);
  //       console.log(error);
  //     }
  //     setLoading(false);
  //   },
  //   []
  // );
};
