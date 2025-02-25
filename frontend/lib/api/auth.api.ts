import { axiosBase } from ".";

export const registerMutate = async ({
  data,
  signal,
}: {
  data: RegisterType;
  signal: AbortSignal;
}) => {
  const res = await axiosBase.post("/auth/sign-up", data, { signal });

  return res.data;
};
