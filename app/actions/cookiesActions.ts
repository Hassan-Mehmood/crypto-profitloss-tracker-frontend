"use server";

import { cookies } from "next/headers";
import { serverApi } from "../axios";

export async function logout() {
  const cookieStore = await cookies();

  if (!cookieStore.has("userCookie")) {
    return;
  }

  serverApi.get("/users/logout");
  cookieStore.delete("userCookie");
}

export async function getUserCookie() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("userCookie")?.value;

  return sessionCookie;
}
