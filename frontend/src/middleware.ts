import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get a cookie
  const devster_auth_cookie = request.cookies.get("devster_auth_cookie")?.value;
  const devster_refresh_cookie = request.cookies.get(
    "devster_refresh_cookie"
  )?.value;

  const response = NextResponse.next();

  // console.log(devster_auth_cookie);

  // if (devster_auth_cookie && devster_refresh_cookie) {
  //   response.cookies.set("devster_auth_cookie", devster_auth_cookie);
  //   response.cookies.set("devster_refresh_cookie", devster_refresh_cookie);
  // }

  // // Setting a cookie with additional options
  // //   response.cookies.set({
  // //     name: "myCookieName",
  // //     value: "some-value",
  // //     httpOnly: true,
  // //   });

  // // Delete a cookie
  // response.cookies.delete("devster_auth_cookie");
  // response.cookies.delete("devster_refresh_cookie");

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
