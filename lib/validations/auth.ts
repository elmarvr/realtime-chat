import { z } from "zod";

export const usernameSchema = z.string().min(3);

const passwordSchema = z.string().min(8);

export const signinSchema = z.object({
  emailOrUsername: z.string().email().or(usernameSchema),
  password: passwordSchema,
});

export const signupSchema = z.object({
  email: z.string().email(),
  username: usernameSchema,
  password: passwordSchema,
});

export const signupContinueSchema = z.object({
  username: usernameSchema,
});

export const verifyEmailSchema = z.object({
  code: z.string().length(6),
});

export const checkEmailSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
    code: verifyEmailSchema.shape.code,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
