"use client";

import * as React from "react";
import {
  UserRound,
  StickyNote,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import { Typography } from "./ui/typography";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // This is sample data.
  const items = [
    { title: "Comments", url: "/comments", icon: StickyNote },
    { title: "Users", url: "/users", icon: UserRound  },
  ];
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex justify-center mb-8">
            <Typography variant="h2" className="text-brand">LOGO</Typography>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg h-12  transition-colors ${
                          isActive
                            ? "bg-white text-brand"
                            : "text-sidebar-foreground "
                        }`}
                      >
                        <item.icon size={18} />
                        {item.title}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>{" "}
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
