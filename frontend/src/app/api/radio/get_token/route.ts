import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from "@/lib/const";
import { NextResponse } from "next/server";
import { stringify } from "querystring";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const req = await request.json();
  const { code } = req;

  const data = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      //   Authorization:
      //     "Basic " +
      //     Buffer.from(
      //       `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      //     ).toString("base64"),
    },
    body: stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  })
    .then(async (resp) => resp.json())
    .then((data) => {
      cookies().set("authData", JSON.stringify(data));
      return data;
    });

  return NextResponse.json(data);
}
