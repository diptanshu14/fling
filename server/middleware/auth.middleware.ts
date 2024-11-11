import jwt from "jsonwebtoken"
import User from "../models/user.model"
import { NextFunction, Request, Response } from "express"
import { UserType } from "../lib/types"

interface AuthenticateRequest extends Request {
    user?: UserType | null
}

export const protectedRoute = async (req: AuthenticateRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            res.status(401).json({ success:false, message: "Not authorized - No token provided" })
            return
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string }
        if (!decoded) {
            res.status(401).json({ success:false, message: "Not authorized - Invalid token" }) 
            return
        }

        const currentUser = await User.findById(decoded.userId)
        if (!currentUser) {
            res.status(401).json({ success: false, message: "Not authorized - User not found" })
            return
        }

        req.user = currentUser
        next()
    } catch (error) {
        console.log("Error in auth middleware: ", error)

        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ success:false, message: "Not authorized - Invalid token" })
        } else {
            res.status(500).json({ success: false, message: "Internal Server Error" })
        }
    }
}