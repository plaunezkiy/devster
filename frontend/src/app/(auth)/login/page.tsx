"use client";

import { API_URL } from "@/lib/const";
import useFetch from "@/lib/hooks/useFetch";
import { User, setUser } from "@/lib/store/features/userSice";
import { useAppDispatch } from "@/lib/store/store";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, _fetch } = useFetch();
  const [email, setEmail] = useState<string | null>(null);
  const [pass, setPass] = useState<string | null>(null);

  const login = (event: React.SyntheticEvent) => {
    event.preventDefault();

    _fetch("/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: pass,
      }),
    }).then((data) => {
      dispatch(setUser(data));
      localStorage.setItem("user", JSON.stringify(data));
      router.push("/");
    });
  };

  return (
    <div className="w-full flex flex-col items-center mt-12">
      <p>Hello and welcome to Devster!</p>
      <form
        onSubmit={login}
        className="flex flex-col gap-2 p-4 border shadow rounded"
      >
        <p>Email</p>
        <input
          className="py-1 px-2 border dark:bg-zinc-700 rounded"
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="email"
        />
        <p>Password</p>
        <input
          className="py-1 px-2 border dark:bg-zinc-700 rounded"
          onChange={(e) => setPass(e.target.value)}
          type="text"
          placeholder="password"
        />
        <button
          type="submit"
          className="mt-4 px-2 py-1 border rounded hover:bg-gray-200 hover:text-gray-700"
        >
          Log Me In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
