/**
 * @returns Multi Select Drop doen
 * @used_in @Components/CreateAUser.tsx
 * @description website navigation menu for mobile only users
 */

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { cn } from "@/Styling configs/utils";

const DropDownSelect = ({
  options = null,
  placeholder = "Select an Option",
  className = null,
  setValue = null,
  value = null,
}) => {
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className={cn(className, "w-45")}>
        {/* Placeholder */}
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      {/* Drop Down */}
      <SelectContent className="bg-white">
        {options
          ? options.map((item: any, index: number) => (
              <SelectItem
                className="hover:bg-gray-100 cursor-pointer"
                value={item.value}
                key={index}
              >
                {item.name}
              </SelectItem>
            ))
          : null}
      </SelectContent>
    </Select>
  );
};

export default DropDownSelect;
