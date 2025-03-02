"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { passwordSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { registerMutateFn } from "@/lib/api/auth.api";
import { signal } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { tanstackGlobalErrorHandler } from "@/helpers";
import { register } from "module";

const formSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
});

export default function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });
  const router = useRouter();
  const reigsterMutate = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: registerMutateFn,
    onSuccess: () => router.push("/"),
    onError: tanstackGlobalErrorHandler,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
    };

    reigsterMutate.mutate({ data, signal });
  }

  return (
    <Card className="w-[350px] xl:w-[450px] mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Sign up</CardTitle>
        <CardDescription>Sign up to Shoop! to start shopping</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="password"
                      {...field}
                      maxLength={50}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={reigsterMutate.isPending || reigsterMutate.isSuccess}
            >
              {reigsterMutate.isPending ? (
                <>
                  <Loader2 className="animate-spin" /> Loading...
                </>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Button variant={"link"} asChild>
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
