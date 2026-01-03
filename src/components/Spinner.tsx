import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

const Spinner = ({className}:React.ComponentProps<"div">):React.ReactElement => {
  return (
    <div className={cn(className, 'loader')}></div>
  )
}

export default Spinner