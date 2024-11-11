import User from "../models/user.model"

export const swipeRightService = async (currentUserId: any, likedUserId: any) => {
    const currentUser = await User.findById(currentUserId)
    const likedUser = await User.findById(likedUserId)

    if (!likedUser || !currentUser) { return null }

    if (!currentUser.likes.includes(likedUserId)) {
        currentUser.likes.push(likedUserId)

        if (likedUser.likes.includes(currentUserId)) {
            currentUser.matches.push(likedUserId)
            likedUser.matches.push(currentUserId)

            await Promise.all([currentUser.save(), likedUser.save()])
        } else {
            await currentUser.save()
        }
    }

    return currentUser
}


export const swipeLeftService = async (currentUserId: any, dislikedUserId: any) => {
    const currentUser = await User.findById(currentUserId)
    if (!currentUser) { return null }

    if (!currentUser.dislikes.includes(dislikedUserId)) {
        currentUser.dislikes.push(dislikedUserId)
        await currentUser.save()
    }

    return currentUser
}