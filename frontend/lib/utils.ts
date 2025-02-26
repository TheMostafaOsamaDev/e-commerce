import { FRONTEND_URL } from "@/config";
import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getUserData() {
  try {
    const res = await axios.get(`${FRONTEND_URL}/api/decrypt`, {
      withCredentials: true,
    });
    const data = res.data;
  } catch (error) {
    console.log(error);
  }
}
