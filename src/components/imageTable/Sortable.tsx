'use client'

import { cn } from '@/Styling configs/utils';
import {useSortable} from '@dnd-kit/react/sortable';
import { TableCell, TableRow } from '@mui/material';
import { flexRender } from '@tanstack/react-table';
import Image from 'next/image';


const Sortable = ({row, id, index}) => {

   const sortable = useSortable({
    id,
    index
  });

    
    return (

      <TableRow
            ref={sortable.ref}
            className={cn("bg-white! text-amber-950! drop-shadow-md border-collapse!")}
        data-state={row.getIsSelected() && "selected"}
    >
        {row.getVisibleCells().map((cell:any) => (
            
            cell.column.id !== "image_url" ?
            <TableCell key={cell.id} className="text-center! border-0!">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell> :
            <TableCell key={cell.id} style={{backgroundImage:`url(${row.getValue('image_url')})`}} className='bg-center bg-cover border-0!'>
                   
            </TableCell>
        ))}
            </TableRow>
            
  )
}

export default Sortable