import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from "@/lib/const";
import { NextResponse } from "next/server";

let querystring = require("querystring");

export async function POST(request: Request) {
  const req = await request.json();
  const { refresh_token } = req;

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
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
      redirect_uri: SPOTIFY_REDIRECT_URI,
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
    // grant_type: "authorization_code",
    // code,
    // redirect_uri: process.env.REDIRECT_URI,
    // client_id: ,
    // client_secret: process.env.SPOTIFY_CLIENT_SECRET,
  }).then((resp) => {
    return resp.json();
  });
  return NextResponse.json(data);
  //   console.log(process.env.REDIRECT_URI);
}
