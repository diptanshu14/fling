import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL)
        console.log(`Database Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("Error connecting to Database: ", error)
        process.exit(1)
    }
}

export default connectDB