import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from "@/lib/const";
import { NextResponse } from "next/server";
import { stringify } from "querystring";

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
  }).then(async (resp) => {
    return await resp.json();
  });

  return NextResponse.json(data);
}
