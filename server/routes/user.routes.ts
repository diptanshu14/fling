import express from "express"
import { protectedRoute } from "../middleware/auth.middleware"
import { getMe } from "../controllers/user.controller"

const router = express.Router()

router.get("/me", protectedRoute, getMe)

export default router