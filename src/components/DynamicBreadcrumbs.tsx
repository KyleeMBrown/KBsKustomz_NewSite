"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { cn } from "@/lib/utils"
  
import { usePathname } from "next/navigation"

const DynamicBreadcrumbs = () => {
    const path = usePathname();
    console.log(path)

  const nameMap = {
        "/dashboard": ["Dashboard"],
        "/dashboard/manage/images": ["Dashboard", "Manage", "Image"],
        "/dashboard/settings/general": ["Dashboard, Settings, General"],
        "/dashboard/users/create": ["Dashboard", "Manage Users", "Create a New User"],
        "/dashboard/users/edit": ["Dashboard", "Manage Users", "Edit Users"],
        "/dashboard/analytics/general":["Dashboard", "Site Analytics", "General"]
    }
  return (
    <Breadcrumb >
    <BreadcrumbList >
        {nameMap[path]?.map((name: string, index: number) => (
        <div key={index} className="flex items-center gap-3">
          <BreadcrumbItem>
            {index === 1 ?
              <BreadcrumbPage >{name}</BreadcrumbPage>
              :
                <BreadcrumbLink className={cn(index === nameMap[path].length - 1 && "underline", "text-black")} href={index===0?"/dashboard":path}>{name}</BreadcrumbLink>
            }
          </BreadcrumbItem>
          {!(index === nameMap[path].length - 1) ? <BreadcrumbSeparator /> : null}
          </div>  
      ))}
    </BreadcrumbList>
  </Breadcrumb>
  )
}

export default DynamicBreadcrumbs