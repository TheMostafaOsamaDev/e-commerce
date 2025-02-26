import { USER_DATA_COOKIE_NAME } from "@/config";
import { cookies } from "next/headers";

export const getUserData = async () => {
  const cookiesStore = await cookies();
  const userData = cookiesStore.get(USER_DATA_COOKIE_NAME)?.value;

  console.log(userData);
};
