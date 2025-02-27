import { FRONTEND_URL, USER_DATA_COOKIE_NAME } from "@/config";
import axios from "axios";
import { cookies } from "next/headers";

export const getUserData = async (): Promise<UserType | null> => {
  const cookiesStore = await cookies();
  const userData = cookiesStore.get(USER_DATA_COOKIE_NAME)?.value;

  try {
    const res = await axios.post(`${FRONTEND_URL}/api/decrypt`, {
      encryptedData: userData,
    });

    const decryptedData = res.data;

    if (decryptedData) {
      return decryptedData as UserType;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
