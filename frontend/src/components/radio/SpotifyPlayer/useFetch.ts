import { BASE_URL } from "@/lib/const";
import { useState, useCallback } from "react";

const refreshUrl = BASE_URL + "apps/radio/refresh";

type authData = {
  access_token: string;
  refresh_token: string;
};

export const useRefreshTokenFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (url: string, authData: authData, applyData: () => void) => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authData.access_token,
          },
        });
        if (res.status === 401) {
          window.location.href =
            refreshUrl + `?refresh_token=${authData.refresh_token}`;
        }
        const data = await res.json();
        applyData(data);
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
      setLoading(false);
    },
    []
  );

  const putData = useCallback(
    async (url: string, authData: authData, body, applyData: () => void) => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authData.access_token,
          },
          body: body,
        });
        if (res.status === 401) {
          window.location.href =
            refreshUrl + `?refresh_token=${authData.refresh_token}`;
        }
        const data = await res.json();
        applyData(data);
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
      setLoading(false);
    },
    []
  );

  const postData = useCallback(
    async (url: string, authData: authData, body, applyData: () => void) => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authData.access_token,
          },
          body: body,
        });
        if (res.status === 401) {
          window.location.href =
            refreshUrl + `?refresh_token=${authData.refresh_token}`;
        }
        const data = await res.json();
        applyData(data);
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
      setLoading(false);
    },
    []
  );

  const deleteData = useCallback(
    async (url: string, authData: authData, body, applyData: () => void) => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authData.access_token,
          },
          body: body,
        });
        if (res.status === 401) {
          window.location.href =
            refreshUrl + `?refresh_token=${authData.refresh_token}`;
        }
        const data = await res.json();
        applyData(data);
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
      setLoading(false);
    },
    []
  );

  return { loading, error, fetchData, putData, postData, deleteData };
};