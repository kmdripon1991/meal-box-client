"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import { GiMeal } from "react-icons/gi";
import ProfileDropdown from "@/components/profileDropdown/ProfileDropdown";
import { LogIn, Menu } from "lucide-react";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import { useEffect } from "react";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
  };
}

const Navbar1 = ({
  logo = {
    url: "/",
    src: "/logo.png",
    alt: "logo",
    title: "Meal Box",
  },
  menu = [
    { title: "Home", url: "/" },

    {
      title: "Pricing",
      url: "#",
    },
    {
      title: "Blog",
      url: "#",
    },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
  },
}: Navbar1Props) => {
  const { user, myInfo } = useUser();
  useEffect(() => {
    const justLoggedIn = sessionStorage.getItem("justLoggedIn");
    if (justLoggedIn) {
      sessionStorage.removeItem("justLoggedIn");
      window.location.reload();
    }
  }, []);
  console.log(myInfo?.profileImage);
  return (
    <section className="box-shadow py-4">
      <div className="max-w-5xl mx-auto px-5 ">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex  items-center gap-6">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              {/* <img src={logo.src} className="max-h-8" alt={logo.alt} /> */}

              <Image
                src={logo.src}
                alt={logo.alt}
                height={32}
                width={32} // Equivalent to max-h-8 (32px)
                className="h-8 w-auto" // Tailwind: set fixed height and auto width
                priority // Optional: loads the image sooner
              />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
          </div>
          <div>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex max-lg:ml-auto space-x-4">
            {/* <Link href={"/create-meal-provider"}> */}
            <div className="flex flex-col items-center gap-2">
              <div className="group relative">
                {user && user?.role === "customer" && (
                  <Link href={"/create-meal-provider"}>
                    <Button
                      variant="outline"
                      className="rounded-full flex items-center gap-1 cursor-pointer"
                    >
                      C M Provider
                      <GiMeal className="text-2xl" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            {user ? (
              <ProfileDropdown />
            ) : (
              <div>
                {/*Change by ripon */}
                <Button variant="default">
                  <Link
                    className="flex gap-1.5 items-center "
                    href={auth.login.url}
                  >
                    {auth.login.title}
                    <span className="">
                      {" "}
                      <LogIn />
                    </span>
                  </Link>
                </Button>
              </div>
            )}
            {/* Menu Open Button */}
            <button className="lg:hidden">
              <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="max-h-8" alt={logo.alt} />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <img src={logo.src} className="max-h-8" alt={logo.alt} />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <Button>
                      <a href={auth.login.url}>{auth.login.title}</a>
                    </Button>
                    <Button>Logout</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar1 };
