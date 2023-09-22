import { createUserHandler, loginUserHandler, verifyUserHandler } from "../controllers/user.controller";

import express from "express"
import validateResource from "../middleware/validateResrouce";
import { createUserSchema, loginUserSchema, verifyUserSchema } from "../schema/user.schema";

const router = express.Router();

router.post("/create",validateResource(createUserSchema), createUserHandler)

router.post("/verify",validateResource(verifyUserSchema), verifyUserHandler)

router.post("/login",validateResource(loginUserSchema), loginUserHandler)


export default router;
