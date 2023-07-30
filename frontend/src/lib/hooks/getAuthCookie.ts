"use server";
import { cookies } from "next/headers";

export const getAuthCookie = async () =>
  cookies().get("devster_auth_cookie")?.value;
