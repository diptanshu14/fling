import express from "express"
import { test } from "../controllers/auth.controller"

const router = express.Router()

router.get("/test", test)

export default router