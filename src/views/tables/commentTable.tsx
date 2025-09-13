"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import {  useComments, useRemoveComment } from "@/api/comment";
import type commentInterface from "@/types/commentInterface";
import CommentDialog from "../dialogs/commentDialog";
import { Typography } from "@/components/ui/typography";
import DeleteDialog from "../dialogs/deleteDialog";
import Loader from "@/components/Loader";

export default function CommentsTable() {
  const { data: comments = [], isLoading } = useComments();
  const removeMutation = useRemoveComment();

  const columns: ColumnDef<commentInterface>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const comment = row.original;
        return (
          <div className="flex gap-2">
            <CommentDialog comment={comment} mode="edit" />
           <DeleteDialog onClick={() => removeMutation.mutate(comment.id)} />
          </div>
        );
      },
    },
  ];

  if (isLoading) return <Loader/>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Typography variant={"h2"}>Comments</Typography>
        <CommentDialog mode="add" />
      </div>
      <DataTable columns={columns} data={comments} />
    </div>
  );
}
