import express from "express"
import { protectedRoute } from "../middleware/auth.middleware"
import { getMe, updateProfile } from "../controllers/user.controller"

const router = express.Router()

router.get("/me", protectedRoute, getMe)
router.put("/update", protectedRoute, updateProfile)

export default router