import { API_URL } from "@/lib/const";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

const routeHandler = async (request: NextRequest, path: string[]) => {
  //   const req = await request.json();
  //   const { query } = req;
  const resp = await fetch(API_URL + path.join("/") + "/", {
    method: request.method,
    headers: request.headers,
    body: request.body,
    ...{ duplex: "half" },
  });
  if (resp.ok) {
    const data = await resp.json();
    
    return NextResponse.json(data);
  }
  //   if (resp.status === 401) {
  //     cookies().delete("devster_auth_cookie");
  //   }
  const error = await resp.text();
  console.log(error);

  //   const cookie = cookies().get("devster_auth_cookie");

  //   const data = await fetch(API_URL + "schedules/today", {
  //     credentials: "include",
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     //   Cookie: `${cookie?.name}=${cookie?.value}`,
  //       // ...request.headers,
  //       // coo,
  //     },
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => data);
  //   console.log(data);

  return NextResponse.json(error);
};

export async function GET(
  request: NextRequest,
  { params: { path } }: { params: { path: string[] } }
) {
  return routeHandler(request, path);
}

export async function POST(
  request: NextRequest,
  { params: { path } }: { params: { path: string[] } }
) {
  return routeHandler(request, path);
}

export async function PUT(
  request: NextRequest,
  { params: { path } }: { params: { path: string[] } }
) {
  return routeHandler(request, path);
}

export async function PATCH(
  request: NextRequest,
  { params: { path } }: { params: { path: string[] } }
) {
  console.log(request);

  return routeHandler(request, path);
}

export async function DELETE(
  request: NextRequest,
  { params: { path } }: { params: { path: string[] } }
) {
  return routeHandler(request, path);
}
