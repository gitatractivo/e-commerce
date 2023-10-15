import express from "express"
import user from "./user.route"
import merchant from "./merchant.route"

const router = express.Router();

router.use("/user", user)
router.use("/merchant", merchant)

export default router;