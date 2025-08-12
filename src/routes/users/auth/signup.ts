import { Request, Response } from "express";
import { UserServices } from "../../../services";
import { CreateUserType } from "../types/auth";
const service = new UserServices()

export async function createUserRoute(req: Request, res: Response) {
    const {
        name,
        email,
        password,
    }:
        CreateUserType = req.body

    const isEmailExist = await service.findByEmail(email);
    if (isEmailExist) {
        return res.status(400).json({
            message: "email already exists"
        })
    }




    const user = await service.create({
        email: email,
        name: name,
        password: password,
    });
    const token = await service.generateToken({
        id: user.id,
        duration:3,
    })
    res.status(200).json({
        message: "user created",
        token:token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    })

}