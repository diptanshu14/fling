import { Request, Response } from "express"
import { UserType } from "../lib/types"

interface AuthenticateRequest extends Request {
    user?: UserType | null
}

export const getMe = async (req: AuthenticateRequest, res: Response) => {
    res.send({ success: true, user: req.user })
}