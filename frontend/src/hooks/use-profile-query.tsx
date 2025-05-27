"use client";

import { ApiResponse } from "@/common/interfaces/response.interface";
import { baseApi } from "@/lib/base-api";
import { useQuery } from "@tanstack/react-query";

export default function useProfileQuery() {
  const query = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return baseApi.get("/auth/me");
    },
  });

  return query;
}
