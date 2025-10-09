import { z } from "zod";

export const schema = z.object({
  // Cognito
  COGNITO_CLIENT_ID: z.string().min(1),

  // Database
  MAIN_TABLE_NAME: z.string().min(1),
});

export const env = schema.parse(process.env);
