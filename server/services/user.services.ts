import User from "../models/user.model"
import cloudinary from "../lib/cloudinary"

export const uploadImageToCloudinary = async (image: string) => {
    try {
        const uploadResponse = await cloudinary.uploader.upload(image)
        return uploadResponse.secure_url
    } catch (error) {
        console.error("Error uploading image:", error)
        return null
    }
}

export const updateUser = async (data: object, userId: string) => {
    const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true })
    return updatedUser
}