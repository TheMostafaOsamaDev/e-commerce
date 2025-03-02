import { Metadata } from "next";
import React from "react";
import SignInForm from "@/components/forms/SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to Shoop! to start shopping",
};

export default function SignInPage() {
  return (
    <section className="container h-[85vh] grid place-items-center">
      <SignInForm />
    </section>
  );
}
