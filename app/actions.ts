"use server";

import { cookies } from "next/headers";
import { serverApi } from "./axios";

export async function logout() {
  const cookieStore = await cookies();

  if (!cookieStore.has("userCookie")) {
    return;
  }

  serverApi.get("/users/logout");

  cookieStore.delete("userCookie");
}
