import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import Link from "next/link";
import SignupForm from "@/app/(HomePage)/components/SignupForm";
import LoginForm from "@/app/(HomePage)/components/LoginForm";
import Logout from "./Logout";
import { getUserCookie } from "@/app/actions/cookiesActions";
import { useQuery } from "@tanstack/react-query";
import { serverApi } from "@/app/axios";

export default async function Navbar() {
  const cookie = await getUserCookie();

  return (
    <NavigationMenu className="mb-10 pt-10">
      <NavigationMenuList className="">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {cookie && (
          <NavigationMenuItem>
            <Link href="/portfolio" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Portfolio
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )}

        {!cookie && (
          <>
            <NavigationMenuItem>
              <SignupForm />
            </NavigationMenuItem>

            <NavigationMenuItem>
              <LoginForm />
            </NavigationMenuItem>
          </>
        )}

        {cookie && (
          <NavigationMenuItem>
            <Logout />
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
