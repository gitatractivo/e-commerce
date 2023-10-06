import { object, string, TypeOf ,z} from "zod";




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
    role: z.enum(["USER", "ADMIN", "MERCHANT"]).optional(),
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
export const merchantSchema = object({
  body: object({
      email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
});


export const resetPassword = object({
  body: object({
    passwordOld: string({
      required_error: "Old Password is required",
    }),
    passwordNew: string({
      required_error: "New Password is required",
    }),
    passwordConfirmation: string({
      required_error: "Confirm Password is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }).refine((data) => data.passwordNew === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
})

export const changePassword = object({
  body: object({
    
    password: string({
      required_error: "New Password is required",
    }),
    passwordConfirmation: string({
      required_error: "Confirm Password is required",
    }),
    
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export const forgotPassword = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
})

export const verifyEmailForgotPassword = object({
  query: object({
    token: string({
      required_error: "Token is required",
    }),
    
  }),
});

export const resetForgotPassword = object({
  body: object({
    token: string({
      required_error: "Token is required",
    }),
    passwordNew: string({
      required_error: "New Password is required",
    }),
    passwordConfirmation: string({
      required_error: "Confirm Password is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }).refine((data) => data.passwordNew === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});




export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["query"];

export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];

export type MakeMerchantInput = TypeOf<typeof merchantSchema>["body"];

export type ResetPasswordInput = TypeOf<typeof resetPassword>["body"];

export type ChangePasswordInput = TypeOf<typeof changePassword>["body"];

export type ForgotPasswordInput = TypeOf<typeof forgotPassword>["body"];

export type VerifyEmailForgotPasswordInput = TypeOf<
  typeof verifyEmailForgotPassword
>["query"];



