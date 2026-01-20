import * as React from "react"
import {Minus, Plus } from "lucide-react"

import { SearchForm } from "@/components/search-form"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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
} from "@/components/ui/sidebar"

import LogoutButton from "./LogoutButton"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Images",
      url: "#",
      items: [
        {
          title: "Upload",
          url: "/dashboard/images/upload",
        },
        {
          title: "Manage",
          url: "/dashboard/images/manage",
        }
      ],
    },
    
    {
      title: "Manage Users",
      url: "#",
      items: [
        {
          title: "Create New User",
          url: "/dashboard/users/create",
        },
        {
          title: "Edit Users",
          url: "#",
        }
      ],
    },
    {
      title: "Site Analytics",
      url: "#",
      items: [
        {
          title: "General",
          url: "#",
        }
      ],
    },
    {
      title: "Settings",
      url: "#",
      items: [
        {
          title: "General",
          url: "#"
        }
      ],
    }
  ],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar {...props} className="bg-amber-950" >
      <SidebarHeader className="bg-amber-950 text-white">
        <SidebarMenu >
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
              <a href="/dashboard" className="cursor-pointer">
                <img alt="KB's Kustomz Logo" src="/images/logo.png" className="size-10" />
              </a>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">KB's Kustomz Dashboard</span>
                  <span className="">v1.0.0</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="bg-amber-950 text-white">
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index===0}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent className="text-white">
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={null}
                            >
                              <a className="text-white" href={item.url}>{item.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
     <LogoutButton />
    </Sidebar>
  )
}
