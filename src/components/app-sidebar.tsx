"use client"

/**
 * Dashboard Sidebar
 */

import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import LogoutButton from "./LogoutButton";
import { JwtPayload } from "@supabase/supabase-js";

interface Props {
  user: JwtPayload;
}

// Sidebar data
const data = {
  navMain: [
    {
      title: "Images",
      url: "#",
      items: [
        { title: "Upload", url: "/dashboard/images/upload" },
        { title: "Manage", url: "/dashboard/images/manage" },
      ],
    },
    {
      title: "Users",
      url: "#",
      items: [
        { title: "Create New User", url: "/dashboard/users/create" },
        { title: "Manage", url: "/dashboard/users/manage" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      items: [{ title: "General", url: "/dashboard/settings/general" }],
    },
  ],
};

export function AppSidebar({ user, ...props }: Props) {
  const pathName = usePathname();

  return (
    <Sidebar {...props} className="bg-amber-950">
      <SidebarHeader className="bg-amber-950 text-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
                <Link href="/dashboard" className="cursor-pointer">
                  <Image
                    width={80}
                    height={80}
                    src="/images/logo.png"
                    alt="KB's Kustomz Logo"
                    fetchPriority="high"
                  />
                </Link>
                <div className="flex flex-col gap-1 leading-none w-full">
                  <h2 className="font-medium text-[14px] w-full">
                    KB's Kustomz Dashboard
                  </h2>
                  <p className="">v1.0.0</p>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-amber-950 text-white">
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((section) => {
              const [isOpen, setIsOpen] = useState(false);

              // Automatically open the section if pathname matches
              useEffect(() => {
                const shouldBeOpen = section.items.some((item) =>
                  pathName.startsWith(item.url)
                );
                setIsOpen(shouldBeOpen);
              }, [pathName, section.items]);

              return (
                <Collapsible
                  key={section.title}
                  open={isOpen}
                  onOpenChange={(open) => setIsOpen(open)}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        {section.title}
                        <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                        <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    {section.items?.length ? (
                      <CollapsibleContent className="text-white">
                        <SidebarMenuSub>
                          {section.items.map((item) => (
                            <SidebarMenuSubItem key={item.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathName === item.url}
                              >
                                <Link
                                  href={item.url}
                                  className="text-white"
                                >
                                  {item.title}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
      <LogoutButton user={user} />
    </Sidebar>
  );
}