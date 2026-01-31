/**
 * @returns Loading Spinner
 * @description Spinner used for loading states in application
 */

import { cn } from "@/Styling configs/utils";

const Spinner = ({
  className,
  color = "rgb(62,62,62)",
}: React.ComponentProps<"div">): React.ReactElement => {
  return (
    <div
      style={{
        background: `radial-gradient(farthest-side, ${color} 94%, #0000) top/8px 8px no-repeat, conic-gradient(#0000 30%, ${color}`,
      }}
      className={cn(className, "loader")}
    ></div>
  );
};

export default Spinner;
