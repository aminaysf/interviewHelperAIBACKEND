import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { UserServices } from '../../../services';
import { UserRequest } from '../../../core/middleware/validateUserToken';
const service = new UserServices()

export async function verifyUserTokenRoute(req: UserRequest, res: Response) {
console.log("here")

    const userId = req.userId

    if (!userId) {
        return res.status(403).json({
            message: "Unauthorized",
        })
    }

    const user = await service.findById(userId);
    if (!user) {
        return res.status(403).json({
            message: "Unauthorized",
        })
    }

    res.status(200).json({
        message: "user created",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    })

}