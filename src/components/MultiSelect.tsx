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
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
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
