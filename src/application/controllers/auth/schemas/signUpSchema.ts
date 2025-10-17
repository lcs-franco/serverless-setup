import { z } from "zod";

export const signUpSchema = z.object({
  account: z.object({
    email: z.email("'email' must be a valid email address"),
    password: z
      .string()
      .min(8, "'password' must be at least 8 characters long")
      .max(32, "'password' must be at most 32 characters long")
      .regex(/[A-Z]/, "'password' must contain at least one uppercase letter")
      .regex(/[a-z]/, "'password' must contain at least one lowercase letter")
      .regex(/[0-9]/, "'password' must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "'password' must contain at least one special character"
      ),
  }),
  profile: z.object({
    name: z.string().min(1, "'name' is required"),
    birthDate: z.iso.date("'birthDate' must be a valid ISO date"),
  }),
});

export type SignUpBody = z.infer<typeof signUpSchema>;
