import { useMutation } from "@tanstack/react-query";
import React from "react";

export default function useSignUpMutation() {
  const mutation = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: async (data: SignUpType) => {},
  });

  return mutation;
}
