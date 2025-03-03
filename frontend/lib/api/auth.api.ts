import { axiosBase } from ".";

export const registerMutateFn = async ({
  data,
  signal,
}: {
  data: RegisterType;
  signal: AbortSignal;
}) => {
  const res = await axiosBase.post("/auth/sign-up", data, { signal });

  return res.data;
};

export const signInMutateFn = async ({
  data,
  signal,
}: {
  data: SignInType;
  signal: AbortSignal;
}) => {
  const res = await axiosBase.post("/auth/sign-in", data, { signal });

  return res.data;
};

export const signOutMutateFn = async ({ signal }: { signal: AbortSignal }) => {
  const res = await axiosBase.delete("/auth/sign-out", { signal });

  return res.data;
};

export const updateProfileMutateFn = async ({
  data,
  signal,
}: {
  data: UpdateProfileType;
  signal: AbortSignal;
}) => {
  const res = await axiosBase.patch(
    "/auth/update",
    {
      firstName: data.firstName,
      lastName: data.lastName,
    },
    { signal }
  );

  return res.data;
};
