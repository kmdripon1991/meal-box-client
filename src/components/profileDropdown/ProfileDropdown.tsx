import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { getMe, logout } from "@/services/Auth/authServices";
import { TUser } from "@/types";

const ProfileDropdown = () => {
  const { setIsLoading, user } = useUser();
  const handleLogout = () => {
    logout();
    setIsLoading(true);
  };

  const [data, setData] = useState<TUser>();
  console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getMe();
      setData(data);
    };

    fetchData();
  }, []);
  const imgSrc = data?.profileImage || "https://github.com/shadcn.png";
  const initials = data?.name
    ? data.name
        .split(" ")
        .map((n: any[]) => n[0])
        .join("")
        .toUpperCase()
    : "SN";
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="cursor-pointer border-none focus:outline-none focus:ring-0 focus:border-none active:border-none"
          asChild
        >
          {user?.role && (
            <Avatar className="border-none">
              <AvatarImage src={imgSrc} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-5  text-black w-[200px]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={"/dashboard"}>Dashboard</Link>
          </DropdownMenuItem>
          <Link href={"/dashboard/user/view-profile"}>
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          {user?.role === "mealProvider" && (
            <Link href={"/dashboard/meal-provider/my-meal-provider"}>
              <DropdownMenuItem>My Shop</DropdownMenuItem>
            </Link>
          )}

          <Link href={"/dashboard/order/my-order"}>
            <DropdownMenuItem>My Order</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <Button className="bg-red-600 text-white w-full">
              <span className="flex gap-1.5 items-center">
                Log out <LogIn className="text-white" />
              </span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileDropdown;
