
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Menu, User } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold tracking-tight">SmartBin SenseStream</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={navigationMenuTriggerStyle()}>
                  Dashboard
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Analytics</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/analytics/overview"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-green-100 to-green-50 p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Analytics Overview
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            View comprehensive analytics of your smart bin usage and sensor data
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link
                        to="/analytics/temperature"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Temperature</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Temperature analytics and trends
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/analytics/humidity"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Humidity</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Humidity analytics and trends
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/analytics/fill-level"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Fill Level</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Bin fill level statistics and patterns
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Settings</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[250px] gap-3 p-4">
                    <li>
                      <Link
                        to="/settings/device"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Device Settings</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Configure your device parameters
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings/account"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Account</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Manage your account details
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings/notifications"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Notifications</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Configure alert thresholds and notifications
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile" className="w-full">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/settings/account" className="w-full">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Link to="/connect">Connect Device</Link>
          </Button>
          <Button size="sm" className="hidden md:flex">
            <Link to="/monitor">Live Monitor</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] bg-white">
              <DropdownMenuItem>
                <Link to="/" className="w-full">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/analytics/overview" className="w-full">Analytics</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/settings/device" className="w-full">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/connect" className="w-full">Connect Device</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/monitor" className="w-full">Live Monitor</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
