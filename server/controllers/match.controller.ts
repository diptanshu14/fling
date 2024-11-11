import { Request, Response } from "express"
import { UserDocument } from "../lib/types"
import { swipeLeftService, swipeRightService } from "../services/match.services"

interface AuthenticateRequest extends Request {
    user?: UserDocument | null 
}

export const swipeRight = async (req:AuthenticateRequest, res:Response) => {
    const { likedUserId } = req.params
    const currentUserId = req.user?.id ? req.user.id : null

    try {
        const currentUser = await swipeRightService(currentUserId, likedUserId)
        if (!currentUser) {
            res.status(404).json({ success: false, message: "User not found" })
            return
        }

        res.status(200).json({ success: true, user: currentUser })
    } catch (error) {
        console.log("Error in swipe right controller: ", error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


export const swipeLeft = async (req:AuthenticateRequest, res:Response) => {
    const { dislikedUserId } = req.params
    const currentUserId = req.user?.id ? req.user.id : null

    try {
        const currentUser = await swipeLeftService(currentUserId, dislikedUserId)
        if (!currentUser) {
            res.status(404).json({ success: false, message: "User not found" })
            return
        }

        res.status(200).json({ success: true, user: currentUser })
    } catch (error) {
        console.log("Error in swipe left controller: ", error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}