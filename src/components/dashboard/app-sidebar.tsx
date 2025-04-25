/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { useEffect, useState } from "react";
import { getMe } from "@/services/Auth/authServices";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userInfo, setUser] = useState<any>();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await getMe();
      setUser(data);
    };

    getUser();
  }, []);

  // 🔐 Conditionally render navigation menu
  const navMain = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: PieChart,
    },
    ...(userInfo?.role === "mealProvider"
      ? [
          {
            title: "Menu",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
              {
                title: "Create Menu",
                url: "/dashboard/menu/create-menu",
              },
              {
                title: "My menu",
                url: "/dashboard/menu/my-menu",
              },
              {
                title: "Update my menu",
                url: "/dashboard/menu/update-menu",
              },
            ],
          },
          {
            title: "Meal Provider",
            url: "#",
            icon: BookOpen,
            items: [
              {
                title: "My Meal Provider",
                url: "/dashboard/meal-provider/my-meal-provider",
              },
              {
                title: "Update Meal Provider",
                url: "/dashboard/meal-provider/update-meal-provider",
              },
            ],
          },
        ]
      : []),

    ...(userInfo?.role === "admin"
      ? [
          {
            title: "Manage User",
            url: "#",
            icon: Bot,
            items: [
              {
                title: "User Block & Delete",
                url: "/dashboard/admin/all-user-status-change",
              },
            ],
          },
          {
            title: "Manage Menu",
            url: "#",
            icon: Bot,
            items: [
              {
                title: "Menu Delete",
                url: "/dashboard/admin/delete-menu",
              },
            ],
          },
        ]
      : []),
  ];

  // 🧠 All Sidebar Data
  const data = {
    user: {
      name: userInfo?.fullName || "",
      email: userInfo?.email || "",
      avatar: "/logo.png",
      role: userInfo?.role,
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain,
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* You can add a TeamSwitcher or App Logo here if needed */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter />
      <SidebarFooter>
        <NavUser user={data.user} userInfo={userInfo} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
