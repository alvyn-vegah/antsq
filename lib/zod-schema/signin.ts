// schemas/signupSchema.ts
import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SigninSchemaType = z.infer<typeof signinSchema>;
