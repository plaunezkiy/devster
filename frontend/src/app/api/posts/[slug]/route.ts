import { NextResponse } from "next/server";

const API_URL = "http://127.0.0.1:8000/api/";

export async function GET(
  request: Request,
  { params: { slug } }: { params: { slug: string } }
) {
  const res = await fetch(API_URL + `blog/post/${slug}/`);
  const post = await res.json();
  return NextResponse.json({ post });
}
