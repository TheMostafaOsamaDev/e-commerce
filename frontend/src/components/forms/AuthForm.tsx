import React from "react";

import { signUpSchema, signUpSchemaType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/forms/CustomFormField";
import { FormFieldType } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthForm({ type }: { type: "sign-in" | "sign-up" }) {
  const form = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: signUpSchemaType) {
    console.log(values);
  }

  return (
    <section className="h-[80vh] flex items-center justify-center">
      <div className="border rounded grid grid-cols-1 md:grid-cols-2 gap-4 w-3xl overflow-hidden shadow-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 p-5"
          >
            <CustomFormField
              control={form.control}
              name="firstName"
              fieldType={FormFieldType.TEXT}
              label="First Name"
              placeholder="Enter your first name"
            />
            <CustomFormField
              control={form.control}
              name="lastName"
              fieldType={FormFieldType.TEXT}
              label="Last Name"
              placeholder="Enter your last name"
            />
            <CustomFormField
              control={form.control}
              name="email"
              fieldType={FormFieldType.EMAIL}
              label="Email"
              placeholder="example@gmail.com"
            />
            <CustomFormField
              control={form.control}
              name="password"
              fieldType={FormFieldType.PASSWORD}
              label="Password"
            />
            <CustomFormField
              control={form.control}
              name="confirmPassword"
              fieldType={FormFieldType.PASSWORD}
              label="Confirm Password"
              placeholder="Re-enter your password"
            />

            <div className="space-y-2">
              <Button type="submit" className="w-full cursor-pointer">
                Submit
              </Button>

              <Button
                asChild
                variant={"secondary"}
                className="w-full"
                type="reset"
              >
                <Link href={"/"}>
                  <ArrowLeft /> Go back
                </Link>
              </Button>
            </div>
          </form>
        </Form>

        <div className="md:block hidden">
          <Image
            src="/images/sign-up-1.jpg"
            width={500}
            height={500}
            alt="Sign up"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
