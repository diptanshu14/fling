import express from "express"
import { protectedRoute } from "../middleware/auth.middleware"
import { swipeLeft, swipeRight } from "../controllers/match.controller"

const router = express.Router()

router.post("/swipe-right/:likedUserId", protectedRoute, swipeRight)
router.post("/swipe-left/:dislikedUserId", protectedRoute, swipeLeft)

export default router