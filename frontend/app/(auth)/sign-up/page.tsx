import SignUpForm from "@/components/Auth/SignUpForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up to Shoop! to start shopping",
};

export default function SignUpPage() {
  return (
    <section className="container">
      <SignUpForm />
    </section>
  );
}
