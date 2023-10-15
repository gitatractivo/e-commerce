import {
    changePasswordUserHandler,
  createUserHandler,
  forgotPasswordUserHandler,
  loginUserHandler,
  merchantUserHandler,
  resetPasswordUserHandler,
  verifyForgotPasswordUserHandler,
  verifyUserHandler,
} from "../controllers/user.controller";

import express from "express";
import validateResource from "../middleware/validateResrouce";
import {
    changePassword,
  createUserSchema,
  forgotPassword,
  loginUserSchema,
  resetPassword,
  verifyUserSchema,
} from "../schema/user.schema";
import requireUser from "../middleware/requireUser";

const router = express.Router();

router.post("/create", validateResource(createUserSchema), createUserHandler);

router.post("/verify", validateResource(verifyUserSchema), verifyUserHandler);

router.post("/login", validateResource(loginUserSchema), loginUserHandler);

router.post(
  "/forgot-password",
  validateResource(forgotPassword),
  forgotPasswordUserHandler
);
router.post(
  "/verify-password",
  validateResource(verifyUserSchema),
  verifyForgotPasswordUserHandler
);

router.post("/change-password", [
  requireUser,
  validateResource(changePassword),
],changePasswordUserHandler
);
router.post(
  "/reset-password",
  [requireUser, validateResource(resetPassword)],
  resetPasswordUserHandler
);

router.post(
  "/make-merchant",
  requireUser,
  merchantUserHandler
);

export default router;
