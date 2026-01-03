/* Modal Popup for handling Errors, Saves, etc */

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
  


const ModalPopup = ({ className=null, title=null, description=null, customClose=null, footer=null, open, setOpen}:React.ComponentProps<any>): React.ReactElement => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className={cn(className)}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className="text-white">
                    {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        {customClose === null ? <Button variant="outline">Cancel</Button> : customClose}
                    </DialogClose>
                    {footer}
                </DialogFooter>
            </DialogContent> 
        </Dialog>
  )
}

export default ModalPopup