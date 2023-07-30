"use server";
import { cookies } from "next/headers";

export const getAuthData = async () =>
  JSON.parse(cookies().get("authData")?.value || "null");
