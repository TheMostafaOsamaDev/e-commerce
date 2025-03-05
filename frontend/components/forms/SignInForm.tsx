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
import { signInMutateFn } from "@/lib/api/auth.api";
import { signal } from "@/lib/api";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { tanstackGlobalErrorHandler } from "@/helpers";

const formSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

export default function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const signInMutate = useMutation({
    mutationKey: ["sign-in"],
    mutationFn: signInMutateFn,
    onError: tanstackGlobalErrorHandler,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      email: values.email,
      password: values.password,
    };

    await signInMutate.mutateAsync({ data, signal });

    window.location.reload();
  }

  return (
    <Card className="w-[350px] xl:w-[450px] mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>Sign in to Shoop! to start shopping</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
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
              disabled={signInMutate.isPending || signInMutate.isSuccess}
            >
              {signInMutate.isPending ? (
                <>
                  <Loader2 className="animate-spin" /> Loading...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Button variant={"link"} asChild>
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
