"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { useUsers, useRemoveUser } from "@/api/user";
import type UserInterface from "@/types/UsersInterface";
import UserDialog from "../dialogs/userDialog";
import { Typography } from "@/components/ui/typography";
import DeleteDialog from "../dialogs/deleteDialog";
import Loader from "@/components/Loader";

export default function UsersTable() {
  const { data: Users = [], isLoading } = useUsers();
  const removeMutation = useRemoveUser();

  const columns: ColumnDef<UserInterface>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const User = row.original;
        return (
          <div className="flex gap-2">
            <UserDialog user={User} mode="edit" />
            <DeleteDialog onClick={() => removeMutation.mutate(User.id)} />
          </div>
        );
      },
    },
  ];

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Typography variant={"h2"}>Users</Typography>
        <UserDialog mode="add" />
      </div>
      <DataTable columns={columns} data={Users} />
    </div>
  );
}
