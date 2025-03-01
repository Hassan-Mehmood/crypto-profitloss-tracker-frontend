"use client";

import { logout } from "@/app/actions/cookiesActions";
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import React from "react";

export default function Logout() {
  return (
    <div onClick={() => logout()}>
      <Link href="/" legacyBehavior passHref>
        <NavigationMenuLink
          className={navigationMenuTriggerStyle()}
          onClick={() => logout()}
        >
          Logout
        </NavigationMenuLink>
      </Link>
    </div>
  );
}
