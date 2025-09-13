"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CirclePlus, SquarePen } from "lucide-react";
import type UsersInterface from "@/types/UsersInterface";
import { useAddUser, useEditUser } from "@/api/user";

type Props = {
  mode: "add" | "edit";
  user?: UsersInterface;
};

export default function UserDialog({ mode, user }: Props) {
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [username, setUsername] = useState(user?.username ?? "");
  const [website, setWebsite] = useState(user?.website ?? "");
  const [company, setCompany] = useState(user?.company?.name ?? "");
  const [address, setAddress] = useState(user?.address?.city ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");

  const addMutation = useAddUser();
  const editMutation = useEditUser();

  const handleSubmit = () => {
    if (mode === "add") {
      addMutation.mutate({
        name,
        email,
        username,
        website,
        company: {
          name: company,
        },
        address: {
          city: address,
        },
        phone,
      });
    } else if (user) {
      editMutation.mutate({
        id: user.id,
        values: {
          name,
          email,
          username,
          website,
          company: {
            name: company,
          },
          address: {
            city: address,
          },
          phone,
        },
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={mode === "add" ? "default" : "outline"}
          size={mode === "add" ? "lg" : "sm"}
        >
          {mode === "add" ? <CirclePlus /> : <SquarePen />}
          {mode === "add" ? " Add User" : " Edit"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add User" : "Edit User"}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <Input
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <Input
            placeholder="City"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Textarea
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={handleSubmit}>
            {mode === "add" ? "Add" : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
