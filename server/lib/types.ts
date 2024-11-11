import mongoose from "mongoose"

export type UserType = {
    name: string
    email: string
    password: string
    age: number
    gender: "male" | "female"
    genderPreference: "male" | "female"
    bio?: string
    image?: string
    likes: mongoose.Schema.Types.ObjectId[]
    dislikes: mongoose.Schema.Types.ObjectId[]
    matches: mongoose.Schema.Types.ObjectId[]
}