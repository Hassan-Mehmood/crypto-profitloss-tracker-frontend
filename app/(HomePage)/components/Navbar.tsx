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
import { serverApi } from "@/app/axios";
import Logout from "./Logout";

export default function Navbar() {
  return (
    <NavigationMenu className="mb-10 pt-10">
      <NavigationMenuList className="gap-4">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/portfolio" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Portfolio
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <SignupForm />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <LoginForm />
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Logout />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
