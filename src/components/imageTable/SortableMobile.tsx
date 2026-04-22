'use client'
import { useSortable } from "@dnd-kit/react/sortable";
import { TableCell, TableRow } from "../ui/table";
import { Checkbox } from "../ui/checkbox";

const SortableMobile = ({row, id, index}) => {
    const sortable = useSortable({
    id,
    index
  });

    return (
        <TableRow ref={sortable.ref} data-state={row.getIsSelected() && "selected"} className="w-full!">
            <TableCell colSpan={1} className="w-[10%]">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    className="border-white ml-3.5 bg-[#ffffff5f] hover:bg-[#150a045e] cursor-pointer text-white transition-all duration-350 ease-in w-5 h-5 max-[768px]:h-7 max-[768px]:w-7 " />
            </TableCell>
            <TableCell colSpan={1} style={{backgroundImage:`url(${row.getValue('image_url')})`}} className=" bg-center bg-cover border-black rounded-lg rounded-tr-none rounded-br-none w-[45%]">
                
            </TableCell>
              <TableCell colSpan={3} className="bg-[#ffffff2a] h-30 rounded-tr-lg rounded-br-lg w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000" className="bi bi-three-dots-vertical fill-[#ffffff4f] hover:fill-[#ffffff64] float-right hover:scale-110 cursor-pointer transition-all duration-105 ease-in" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                </svg>
                
            </TableCell>
        </TableRow>
  )
}

export default SortableMobile