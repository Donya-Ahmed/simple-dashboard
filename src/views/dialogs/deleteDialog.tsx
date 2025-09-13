"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";


type Props = {
  onClick: () => void;
};

export default function DeleteDialog({ onClick }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
              variant="destructive"
              size="sm"
            >
              <Trash size={14} />
            </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Alert</DialogTitle>
        </DialogHeader>
        <div className="text-center">
          Are you sure you want to delete this 
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={onClick}>Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
