import express from "express"
import dotenv from "dotenv"
import { createServer } from "http"

import routes from "./routes/routes.js"
import connectDB from "./config/database.js"

dotenv.config()

const app = express()
const httpServer = createServer(app)
const PORT = process.env.PORT || 5000

app.use(routes)

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})