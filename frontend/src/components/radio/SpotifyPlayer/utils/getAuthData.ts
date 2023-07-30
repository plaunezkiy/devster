"use server";
import { cookies } from "next/headers";
import { AuthData } from "../types";

export const getAuthData = async (): Promise<AuthData> =>
  JSON.parse(cookies().get("authData")?.value || "null");
