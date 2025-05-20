import { z } from "zod";

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name is too short, 2 characters minimum" })
      .max(50, { message: "First name is too long, 50 characters maximum" })
      .regex(/^[A-Za-z\s-]+$/, {
        message: "First name must contain only letters, spaces, and hyphens",
      })
      .trim(),
    lastName: z
      .string()
      .min(2, { message: "Last name is too short, 2 characters minimum" })
      .max(50, { message: "Last name is too long, 50 characters maximum" })
      .regex(/^[A-Za-z\s-]+$/, {
        message: "Last name must contain only letters, spaces, and hyphens",
      })
      .trim(),
    email: z
      .string()
      .email()
      .transform((value) => value.toLowerCase().trim()),
    password: z
      .string()
      .min(8, { message: "Password is too short, 8 characters minimum" })
      .max(50, { message: "Password is too long, 50 characters maximum" })
      .trim(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type signUpSchemaType = z.infer<typeof signUpSchema>;
