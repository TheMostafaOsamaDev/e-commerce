"use client";

import { baseApi } from "@/lib/base-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useSignOutMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["sign-out"],
    mutationFn: async () => {
      return baseApi.delete("/auth/sign-out");
    },
    onSuccess: () => {
      toast.success("Signed out successfully");
    },
  });

  return mutation;
}
