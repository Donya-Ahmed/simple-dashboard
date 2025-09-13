"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAddComment, useEditComment } from "@/api/comment";
import type commentInterface from "@/types/commentInterface";
import { SquarePen, CirclePlus } from "lucide-react";


type Props = {
  mode: "add" | "edit";
  comment?: commentInterface;
};

export default function CommentDialog({ mode, comment }: Props) {
  const [name, setName] = useState(comment?.name ?? "");
  const [email, setEmail] = useState(comment?.email ?? "");
  const [body, setBody] = useState(comment?.body ?? "");

  const addMutation = useAddComment();
  const editMutation = useEditComment();

  const handleSubmit = () => {
    if (mode === "add") {
      addMutation.mutate({ name, email, body });
    } else if (comment) {
      editMutation.mutate({ id: comment.id, values: { name, email, body } });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={mode === "add" ? "default" : "outline"} size={mode === "add" ? "lg" : "sm"}>
       {mode === "add" ? <CirclePlus /> : <SquarePen />} {mode === "add" ? "Add Comment" : "Edit"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add Comment" : "Edit Comment"}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Textarea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={handleSubmit}>{mode === "add" ? "Add" : "Save"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
