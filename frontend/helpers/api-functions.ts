import { chechIfAdminQueryFn } from "@/lib/api/auth.api";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate } from "@tanstack/react-query";

export async function isAdminPrefetch() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["is-admin"],
    queryFn: chechIfAdminQueryFn,
  });

  return dehydrate(queryClient);
}
