import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

const Spinner = ({className, color="rgb(62,62,62)"}:React.ComponentProps<"div">):React.ReactElement => {
  return (
    <div style={{background:`radial-gradient(farthest-side, ${color} 94%, #0000) top/8px 8px no-repeat, conic-gradient(#0000 30%, ${color}`}} className={cn(className, "loader")}></div>
  )
}

export default Spinner