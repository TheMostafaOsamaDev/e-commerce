import { baseURL } from "@/config";
import axios from "axios";

export const signal = new AbortController().signal;

export const axiosBase = axios.create({
  baseURL,
  withCredentials: true,
});
