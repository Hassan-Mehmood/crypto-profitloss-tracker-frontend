import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignUpButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default async function Navbar() {
  return (
    <NavigationMenu className="mb-10 pt-10">
      <NavigationMenuList className="gap-4">
        <NavigationMenuItem>
          <Link href="/">Home</Link>
        </NavigationMenuItem>

        <SignedOut>
          <NavigationMenuItem>
            <SignInButton />
          </NavigationMenuItem>

          <NavigationMenuItem>
            <SignUpButton />
          </NavigationMenuItem>
        </SignedOut>

        <SignedIn>
          <NavigationMenuItem>
            <UserButton />
          </NavigationMenuItem>
        </SignedIn>
        {/* <NavigationMenuItem>
          <Link href="/">Portfolio</Link>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
