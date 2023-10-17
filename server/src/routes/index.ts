import express from "express"
import user from "./user.route"
import merchant from "./merchant.route"
import admin from "./admin.route"

const router = express.Router();

router.use("/user", user)
router.use("/merchant", merchant)
router.use("/admin",admin)

export default router;