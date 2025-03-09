import { chechIfAdminQueryFn } from "@/lib/api/auth.api";
import { getQueryClient } from "@/lib/get-query-client";
import React from "react";

export default async function DashboardPage() {
  //   const queryClient = getQueryClient();

  //   try {
  //     const query = await queryClient.prefetchQuery({
  //       queryKey: ["is-admin"],
  //       queryFn: chechIfAdminQueryFn,
  //     });

  //     console.log(`Queyr:`);

  //     console.log(query);
  //   } catch (error) {
  //     console.log(error);
  //   }

  return <div>DashboardPage</div>;
}
