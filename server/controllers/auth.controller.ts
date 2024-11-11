import { Request, Response } from "express"
import { createUserService, loginService } from "../services/auth.services"

export const signup = async (req: Request, res: Response) => {
    const { name, email, password, age, gender, genderPreference } = req.body
    if (!name || !email || !password || !age || !gender || !genderPreference) {
        res.status(400).json({ success: false, message: "All fields are required" })
        return
    }

    if (age < 18) {
        res.status(400).json({ success: false, message: "You must be at least 18 years old" })
        return
    }

    if (password.length < 8) {
        res.status(400).json({ success: false, message: "Password must be at least 8 characters long" })
        return
    }
    
    try {
        const response = await createUserService(name, email, password, age, gender, genderPreference)

        res.cookie("jwt", response.token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        })

        res.status(201).json({ success: true, user: response.user })
    } catch (error) {
        console.log("Error in signup controller: ", error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


export const login = async (req: Request, res:Response) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({ success: false, message: "All fields are required" })
        return
    }

    try {
        const response = await loginService(email, password) 
        if (!response.user) {
            res.status(401).json({ success: false, message: "Invalid Credentials" })
            return
        }

        res.cookie("jwt", response.token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        })

        res.status(200).json({ success: true, user: response.user })
    } catch (error) {
        console.log("Error in login controller: ", error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


export const logout = async (req: Request, res:Response) => {
    res.clearCookie("jwt")
    res.status(200).json({ success: true, message: "Logged out successfully" })
}