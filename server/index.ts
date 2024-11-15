import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import connectDB from "./lib/database"
import routes from "./routes/routes"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.use(routes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})