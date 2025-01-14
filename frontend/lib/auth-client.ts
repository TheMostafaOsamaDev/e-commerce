import { createAuthClient } from "better-auth/react";
import { baseURL } from "@/config";

export const authClient = createAuthClient({
  baseURL, // the base url of your auth server
});

export const { signIn, signUp, useSession } = createAuthClient();
