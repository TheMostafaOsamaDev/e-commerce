import { getUserData } from "@/actions/auth.actions";
import UpdateUserDataForm from "@/components/forms/UpdateUserDataForm";
import ErrorAlert from "@/components/ui/error-altert";
import { formatAxiosError } from "@/helpers";
import { AxiosError } from "axios";
import React from "react";

export default async function ProfilePage() {
  try {
    const userData = await getUserData();

    if (!userData) {
      throw new AxiosError("User not found");
    }

    return (
      <div className="container">
        <UpdateUserDataForm updateUserData={userData} />
      </div>
    );
  } catch (error) {
    const axiosError = formatAxiosError(error as AxiosError);

    return (
      <div className="container">
        <ErrorAlert title="Error fetching user" description={axiosError} />
      </div>
    );
  }
}
