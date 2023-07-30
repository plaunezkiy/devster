"use client";
import { AuthData } from "@/components/radio/SpotifyPlayer/types";
import { redirect } from "next/navigation";
import { startTransition, useCallback, useEffect, useState } from "react";
import { useSpotifyAuthContext } from "../SpotifyAuthContext";
import { getAuthData } from "./getAuthData";

export const useSpotifyClient = () => {
  const [authData, setAuthData] = useState<AuthData | null>(null);

  const isAuthenticated = !!authData?.access_token;
  const [isLoading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // startTransition(() => getAuthData());
    //   setAuthData(JSON.parse(localStorage.getItem("authData") || "null"));
  }, []);

  const getAuthHeader = () => `Bearer `;

  const refreshToken = async () => {
    const { refresh_token } = authData || {};
    if (refresh_token === "undefined") {
      // if the token is invalid, remove any trace
      localStorage.removeItem("authData");
      // redirect("/apps/radio");
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
          // redirect("/apps/radio/player");
        });
    }
  };

  const get = useCallback(
    async (url: string): Promise<any> => {
      if (!isAuthenticated) return;

      setLoading?.(true);
      return fetch(url, {
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData?.access_token}`,
        },
      })
        .then((resp) => {
          if (resp.status === 401) refreshToken();
          else return resp.json();
        })
        .then((data) => {
          setLoading?.(false);
          return data;
        });
    },
    [authData]
  );

  const post = async (url: string, body?: string): Promise<any> => {
    setLoading?.(true);
    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
      body: body,
    })
      .then((resp) => {
        if (resp.status === 401) refreshToken();
        return resp.json();
      })
      .then((data) => {
        setLoading?.(false);
        return data;
      });
  };

  const put = async (url: string, body?: string): Promise<any> => {
    setLoading?.(true);
    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
      body: body,
    })
      .then((resp) => {
        if (resp.status === 401) refreshToken();
        return resp.json();
      })
      .then((data) => {
        setLoading?.(false);
        return data;
      });
  };

  const _delete = async (url: string, body?: string): Promise<any> => {
    setLoading?.(true);
    return fetch(url, {
      cache: "no-cache",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
      body: body,
    })
      .then((resp) => {
        if (resp.status === 401) refreshToken();
        return resp.json();
      })
      .then((data) => {
        setLoading?.(false);
        return data;
      });
  };

  return {
    get,
    post,
    put,
    _delete,
  };
};

// export class SpotifyClient {
//   setLoading: (arg0: boolean) => void;
//   setError: (arg0: string) => void;
//   setAuthData: (arg0: AuthData | null) => void;
//   getAuthData: () => AuthData | null;

//   constructor(
//     setLoading: (arg0: boolean) => void,
//     setError: (arg0: string) => void,
//     setAuthData: (arg0: AuthData | null) => void,
//     getAuthData: () => AuthData | null
//   ) {
//     console.log(getAuthData());

//     this.getAuthData = getAuthData;
//     this.setAuthData = setAuthData;
//     this.setLoading = setLoading;
//     this.setError = setError;
//   }

//   getAuthHeader() {
//     console.log(this.getAuthData());

//     return `Bearer ${this.getAuthData()?.access_token}`;
//   }

//   async refresh_token() {
//     const { refresh_token } = this.getAuthData() || {};
//     if (refresh_token === "undefined") {
//       // if the token is invalid, remove any trace
//       localStorage.removeItem("authData");
//       this.setAuthData(null);
//       // redirect("/apps/radio");
//     }
//     if (refresh_token) {
//       // if the token exists, attempt refreshing
//       fetch("/api/radio/refresh_token/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ refresh_token }),
//       })
//         .then((resp) => {
//           if (resp.ok) {
//             return resp.json();
//           }
//           // if the request failed, remove any trace
//           localStorage.removeItem("authData");
//           this.setAuthData(null);
//           return;
//         })
//         .then((data) => {
//           if (!data) {
//             return;
//           }
//           localStorage.setItem("authData", JSON.stringify(data));
//           this.setAuthData(data);
//           // redirect("/apps/radio/player");
//         });
//     }
//   }

//   async get(url: string): Promise<any> {
//     console.log(this.getAuthHeader());
//     this.setLoading(true);
//     return fetch(url, {
//       cache: "no-cache",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: this.getAuthHeader(),
//       },
//     })
//       .then((resp) => {
//         if (resp.status === 401) this.refresh_token();
//         else return resp.json();
//       })
//       .then((data) => {
//         this.setLoading(false);
//         return data;
//       });
//   }

//   async post(url: string, body?: string): Promise<any> {
//     this.setLoading(true);
//     return fetch(url, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: this.getAuthHeader(),
//       },
//       body: body,
//     })
//       .then((resp) => {
//         if (resp.status === 401) this.refresh_token();
//         return resp.json();
//       })
//       .then((data) => {
//         this.setLoading(false);
//         return data;
//       });
//   }

//   async put(url: string, body?: string): Promise<any> {
//     this.setLoading(true);
//     return fetch(url, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: this.getAuthHeader(),
//       },
//       body: body,
//     })
//       .then((resp) => {
//         if (resp.status === 401) this.refresh_token();
//         return resp.json();
//       })
//       .then((data) => {
//         this.setLoading(false);
//         return data;
//       });
//   }

//   async delete(url: string, body?: string): Promise<any> {
//     this.setLoading(true);
//     return fetch(url, {
//       cache: "no-cache",
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: this.getAuthHeader(),
//       },
//       body: body,
//     })
//       .then((resp) => {
//         if (resp.status === 401) this.refresh_token();
//         return resp.json();
//       })
//       .then((data) => {
//         this.setLoading(false);
//         return data;
//       });
//   }
// }
