import express from "express"

const router = express.Router()

router.get("/test", (req, res) => {
    res.send("Test Route is Working")
})

export default router