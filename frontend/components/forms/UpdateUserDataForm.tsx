"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useMutation } from "@tanstack/react-query";
import { updateProfileMutateFn } from "@/lib/api/auth.api";
import { tanstackGlobalErrorHandler } from "@/helpers";
import { toast } from "sonner";
import { signal } from "@/lib/api";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
});

export default function UpdateUserDataForm({
  updateUserData,
}: {
  updateUserData: UserType;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: updateUserData.email,
      firstName: updateUserData.firstName,
      lastName: updateUserData.lastName,
    },
  });
  const updateProfileMutate = useMutation({
    mutationKey: ["update_profile"],
    mutationFn: updateProfileMutateFn,
    onError: tanstackGlobalErrorHandler,
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    updateProfileMutate.mutate({ data, signal });
  }

  return (
    <Card className="w-[350px] xl:w-[450px] mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Update you profile</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              disabled
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
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
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={updateProfileMutate.isPending}
            >
              {updateProfileMutate.isPending ? (
                <>
                  <Loader2 className="animate-spin" /> Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
