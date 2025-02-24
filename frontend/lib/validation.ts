import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8)
  .max(50)
  .refine(
    (value) => {
      return (
        /[A-Z]/.test(value) && // At least one uppercase letter
        /[a-z]/.test(value) && // At least one lowercase letter
        /\d/.test(value) && // At least one number
        /[^A-Za-z0-9]/.test(value)
      ); // At least one special character
    },
    {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }
  );
