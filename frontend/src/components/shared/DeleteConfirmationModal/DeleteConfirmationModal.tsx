"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";

interface DeleteConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void> | void;
  isLoading?: boolean;
  title?: string;
  description?: string;
}

export function DeleteConfirmationModal({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
  title = "Confirm Deletion",
  description = "This action cannot be undone. All data will be permanently removed.",
}: DeleteConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] gap-0 p-0 overflow-hidden">
        {/* Header with icon */}
        <DialogHeader className="px-6 pt-6 pb-4 bg-destructive/5 border-b">
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="h-6 w-6" strokeWidth={2} />
            </div>
            <DialogTitle className="text-center text-lg font-semibold">
              {title}
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Description */}
        <DialogDescription className="px-6 py-4 text-center">
          {description}
        </DialogDescription>

        {/* Footer with actions */}
        <DialogFooter className="px-6 py-4 bg-muted/50 gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}