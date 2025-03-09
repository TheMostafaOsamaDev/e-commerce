import { axiosBase } from ".";

export const registerMutateFn = async ({
  data,
  signal,
}: {
  data: RegisterType;
  signal: AbortSignal;
}) => {
  try {
    const res = await axiosBase.post("/auth/sign-up", data, { signal });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const signInMutateFn = async ({
  data,
  signal,
}: {
  data: SignInType;
  signal: AbortSignal;
}) => {
  try {
    const res = await axiosBase.post("/auth/sign-in", data, { signal });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const signOutMutateFn = async ({ signal }: { signal: AbortSignal }) => {
  try {
    const res = await axiosBase.delete("/auth/sign-out", { signal });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfileMutateFn = async ({
  data,
  signal,
}: {
  data: UpdateProfileType;
  signal: AbortSignal;
}) => {
  try {
    const res = await axiosBase.patch(
      "/auth/update",
      {
        firstName: data.firstName,
        lastName: data.lastName,
      },
      { signal }
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const chechIfAdminQueryFn = async ({
  signal,
}: {
  signal: AbortSignal;
}) => {
  try {
    const res = await axiosBase.get("/auth/check-admin", {
      signal,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
