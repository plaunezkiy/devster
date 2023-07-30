import { API_URL } from "@/lib/const";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();
  const { email, password } = req;

  const data = await fetch(API_URL + "auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      console.log(data);
      cookies().set({
        name: "devster_auth_cookie",
        value: data.access,
        httpOnly: true,
        // expires:
        maxAge: 3600 * 1000,
      });
      cookies().set({
        name: "devster_refresh_cookie",
        value: data.refresh,
        httpOnly: true,
        maxAge: 7 * 24 * 3600 * 1000,
      });
      return data.user;
    });
  return NextResponse.json(data);
}
