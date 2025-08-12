import  bcrypt  from 'bcrypt';
import { Request, Response } from "express";
import { UserLoginType } from '../types/auth';
import { UserServices } from '../../../services';
const service = new UserServices()

export async function loginUserRoute(req: Request, res: Response) {
    const {
        password,
        account,
    }:
        UserLoginType = req.body

    
    const user = account.includes("@") ? await service.findByEmail(account) : await service.findById(account);

    if (!user) {
        return res.status(401).json({
            message: "invalid credentials",})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); 
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "invalid credentials",})
    }



    const token = await service.generateToken({
        id: user.id,
        duration: 3,
    })
    res.status(200).json({
        message: "Login successful",
        token: token,
        user: {
            id: user.id,
           name: user.name,
            email: user.email,
        }
    })

}