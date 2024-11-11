import { Request, Response } from "express"
import { UserDocument } from "../lib/types"
import { updateUser, uploadImageToCloudinary } from "../services/user.services"

interface AuthenticateRequest extends Request {
    user?: UserDocument | null 
}


export const getMe = async (req: AuthenticateRequest, res: Response) => {
    res.send({ success: true, user: req.user })
}


export const updateProfile = async (req: AuthenticateRequest, res: Response) => {
    if (!req.user) {
        res.status(404).json({ success:false, message:"User not found" })
        return
    }

    const { image, ...otherData } = req.body
    let updateData = otherData

    try {
        if (image && image.startsWith("data:image")) {
            const uploadImageUrl = await uploadImageToCloudinary(image)

            if (uploadImageUrl) {
                updateData.image = uploadImageUrl
            } else {
                res.status(400).json({ success: false, message: "Error uploading image", })
                return
            }
        }

        const updatedUser = await updateUser(updateData, req.user.id)

        res.status(200).json({ success: true, userId: updatedUser })
    } catch (error) {
        console.log("Error in update profile controller: ", error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}