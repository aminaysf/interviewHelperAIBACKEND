import { z } from "zod";

export const createUserSchema = z.object({
    name: z
      .string({
        message: "Name is required",
      })
      .min(3, {
        message: "Name must be at least 3 characters",
      })
      .max(40, {
        message: "Name must be at most 30 characters",
      }),
    email: z
      .string({
        message: "Email is required",
      })
      .email({
        message: "Invalid email address",
      }),
    password: z
      .string({
        message: "Password is required",
      })
      .min(8, {
        message: "Password must be at least 8 characters",
      })
      .max(30, {
        message: "Password must be at most 30 characters",
      }),
  });
  export type CreateUserType = z.infer<typeof createUserSchema>;
  
export const userLoginSchema = z.object({
    account: z
      .string({
        message: "Email is required",
      })
      .email({
        message: "Invalid email address",
      }),
    password: z
      .string({
        message: "Password is required",
      })
      .min(8, {
        message: "Password must be at least 8 characters",
      })
      .max(30, {
        message: "Password must be at most 30 characters",
      }),
  });
  export type UserLoginType = z.infer<typeof userLoginSchema>;
  