/**
 * @returns Modal Popup
 * @description Modal Popup for handling Errors, Saves, etc
 */

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/Styling configs/utils";

const ModalPopup = ({
  className = null,
  title = null,
  description = null,
  customClose = null,
  footer = null,
  open,
  setOpen,
}: React.ComponentProps<any>): React.ReactElement => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={cn(className)}>
        {/* Header */}
        <DialogHeader>
          {/* Title */}
          <DialogTitle>{title}</DialogTitle>
          {/* Description */}
          <DialogDescription className="text-white">
            {description}
          </DialogDescription>
        </DialogHeader>
        {/* Footer */}
        <DialogFooter>
          <DialogClose asChild>
            {customClose === null ? (
              <Button variant="outline">Cancel</Button>
            ) : (
              customClose
            )}
          </DialogClose>
          {footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalPopup;
