"use client";

import { BadgeCheck, ChevronsUpDown, LogOut, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { IconPassword } from "@tabler/icons-react";
import { GiRamProfile } from "react-icons/gi";
import Link from "next/link";
import { logout } from "@/services/Auth/authServices";
import { useUser } from "@/context/UserContext";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
    role: "customer" | "mealProvider";
  };
}) {
  const { isMobile } = useSidebar();

  const { setIsLoading } = useUser();

  const handleSidebarLogout = async () => {
    await logout();
    setIsLoading(true);
    window.location.href = "/";
  };

  return (
    <SidebarMenu className="">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="/man.png" alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="ml-2 truncate text-[18px] font-medium">
                Profile
              </span>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={"/dashboard/user/view-profile"}>
                <DropdownMenuItem className="cursor-pointer">
                  <Sparkles className="mr-2 h-4 w-4" />
                  <span>View Profile</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {user?.role === "mealProvider" && (
                <Link href={"/dashboard/meal-provider/my-meal-provider"}>
                  <DropdownMenuItem className="cursor-pointer">
                    <BadgeCheck className="mr-2 h-4 w-4" />
                    <span>My meal provider</span>
                  </DropdownMenuItem>
                </Link>
              )}

              <Link href={"/dashboard/user/update-profile"}>
                <DropdownMenuItem className="cursor-pointer">
                  <GiRamProfile className="mr-2 h-4 w-4" />
                  <span>Update Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link href={"/dashboard/user/change-password"}>
                <DropdownMenuItem className="cursor-pointer">
                  <IconPassword className="mr-2 h-4 w-4" />
                  <span>Change Password</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSidebarLogout}
              className="cursor-pointer bg-red-600 text-white"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
