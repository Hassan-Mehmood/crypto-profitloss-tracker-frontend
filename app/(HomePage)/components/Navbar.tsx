import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function Navbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-4">
        <NavigationMenuItem>
          <Link href="/">Home</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/">Portfolio</Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
