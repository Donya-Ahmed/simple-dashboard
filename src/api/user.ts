import type UsersInterface from "@/types/usersInterface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

//  Fetch users
export function useUsers() {
  return useQuery<UsersInterface[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}`);
      return res.data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

// Add User
export function useAddUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newUser: Omit<UsersInterface, "id">) => {
      // simulate API
      return { ...newUser, id: Date.now() };
    },
    onSuccess: (data) => {
      queryClient.setQueryData<UsersInterface[]>(["users"], (old = []) => [
        data,
        ...old,
      ]);
      toast.success(`User "${data.name}" added successfully!`);
    },
    onError: () => {
      toast.error("Failed to add User.");
    },
  });
}

// Edit User
export function useEditUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      values,
    }: {
      id: number;
      values: Omit<UsersInterface, "id">;
    }) => {
      // just simulate
      return { id, ...values };
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<UsersInterface[]>(["users"], (old = []) =>
        old.map((c) => (c.id === updated.id ? updated : c))
      );
      toast.success(`User #${updated.id} updated successfully!`);
    },
    onError: () => {
      toast.error("Failed to update User.");
    },
  });
}

// Remove User
export function useRemoveUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => id, // just return id
    onSuccess: (id) => {
      queryClient.setQueryData<UsersInterface[]>(["users"], (old = []) =>
        old.filter((c) => c.id !== id)
      );
      toast.success(`User #${id} deleted successfully!`);
    },
    onError: () => {
      toast.error("Failed to delete User.");
    },
  });
}
