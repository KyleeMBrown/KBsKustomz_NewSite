"use client";

/**
 * @returns Dashboard Breadcrumbs
 * @used_in /dashboard -> layout.tsx
 * @description dynamically renders the breadcrumbe at the top of the dashboard
 * CLIENT COMPONENT
 */

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

import { cn } from "@/Styling configs/utils";

import { usePathname } from "next/navigation";

const DynamicBreadcrumbs = () => {
  const path = usePathname();
  //console.log(path)

  const nameMap = {
    "/dashboard": ["Dashboard"],
    "/dashboard/images/upload": ["Dashboard", "Images", "Upload"],
    "/dashboard/images/edit": ["Dashboard", "Images", "Edit"],
    "/dashboard/settings/general": ["Dashboard, Settings, General"],
    "/dashboard/users/create": [
      "Dashboard",
      "Manage Users",
      "Create a New User",
    ],
    "/dashboard/users/edit": ["Dashboard", "Manage Users", "Edit Users"],
    "/dashboard/analytics/general": ["Dashboard", "Site Analytics", "General"],
  };
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-white">
        {nameMap[path]?.map((name: string, index: number) => (
          <div key={index} className="flex items-center gap-3">
            <BreadcrumbItem>
              {index === 1 ? (
                <BreadcrumbPage className="text-white">{name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  className={cn(
                    index === nameMap[path].length - 1 && "underline",
                    "text-white"
                  )}
                  href={index === 0 ? "/dashboard" : path}
                >
                  {name}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!(index === nameMap[path].length - 1) ? (
              <BreadcrumbSeparator />
            ) : null}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumbs;
