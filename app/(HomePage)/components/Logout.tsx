"use client";

import { logout } from "@/app/actions";
import { serverApi } from "@/app/axios";
import React from "react";

export default function Logout() {
  return <div onClick={() => logout()}>Logout</div>;
}
