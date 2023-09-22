import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Password is required",
    })
      .min(6, "Password is too short - should be min 6 chars")
      .refine(
        (value) => /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).+$/.test(value),
        {
          message:
            "Password must contain at least one uppercase letter, one digit, and one special character",
        }
      ),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export const verifyUserSchema = object({
  query: object({
    token: string({
      required_error: "Token is required",
    }),
  }),
});

export const loginUserSchema = object({
  body: object({
    password: string({
      required_error: "Password is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["query"];
export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];


