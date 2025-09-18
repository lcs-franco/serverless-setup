import { z } from "zod";

export const emailConfirmationSchema = z.object({
  email: z.email("'email' must be a valid email address"),
  code: z.string().min(6, "'code' must be 6 characters long"),
});

export type EmailConfirmationBody = z.infer<typeof emailConfirmationSchema>;
