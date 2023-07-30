import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from "@/lib/const";
import { NextResponse } from "next/server";
import { stringify } from "querystring";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const authData = JSON.parse(cookies().get("authData")?.value || "");
  return NextResponse.json(authData);
}
