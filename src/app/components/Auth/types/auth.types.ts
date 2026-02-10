import { z } from "zod";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

export type LoginFormInputs = z.infer<typeof loginSchema>;
export type RegisterFormInputs = z.infer<typeof registerSchema>;
