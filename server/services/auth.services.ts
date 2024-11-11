import { UserType } from "../lib/types"
import User from "../models/user.model"
import jwt from "jsonwebtoken"

export const createUserService = async (
    name: string, email: string, password: string, age: number, gender: string, genderPreference: number
) => {
    const user = await User.create({
        name, email, password, age, gender, genderPreference
    })
    const userId = user._id

    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
		expiresIn: "7d",
	})

    const userObject: Partial<UserType> = user.toObject()
    delete userObject.password 

    return { user: userObject, token }
}