import type commentInterface from "@/types/commentInterface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const BASE_URL = "https://jsonplaceholder.typicode.com/comments";

//  Fetch comments
export function useComments() {
  return useQuery<commentInterface[]>({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}`);
      return res.data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

// Add comment
export function useAddComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newComment: Omit<commentInterface, "id">) => {
      // simulate API
      return { ...newComment, id: Date.now() };
    },
    onSuccess: (data) => {
      queryClient.setQueryData<commentInterface[]>(["comments"], (old = []) => [
        data,
        ...old,
      ]);
      toast.success(`Comment "${data.name}" added successfully!`);
    },
    onError: () => {
      toast.error("Failed to add comment.");
    },
  });
}

// Edit comment
export function useEditComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      values,
    }: {
      id: number;
      values: Omit<commentInterface, "id">;
    }) => {
      // just simulate
      return { id, ...values };
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<commentInterface[]>(["comments"], (old = []) =>
        old.map((c) => (c.id === updated.id ? updated : c))
      );
      toast.success(`Comment #${updated.id} updated successfully!`);
    },
    onError: () => {
      toast.error("Failed to update comment.");
    },
  });
}

// Remove comment
export function useRemoveComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => id, // just return id
    onSuccess: (id) => {
      queryClient.setQueryData<commentInterface[]>(["comments"], (old = []) =>
        old.filter((c) => c.id !== id)
      );
      toast.success(`Comment #${id} deleted successfully!`);
    },
    onError: () => {
      toast.error("Failed to delete comment.");
    },
  });
}
