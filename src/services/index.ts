import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Users, { UserInput } from "../core/database/models/user.model";


//services are related to our db meaning it saves our user's data into this db and the opposite is for routes 

export class UserServices {
    private readonly salt = 12;
    async create(data: UserInput) {

        const user = await Users.create({
            ...data,
            password: await bcrypt.hash(data.password, this.salt)
        })
        return user
    }

    async findById(id:string): Promise<Users | null >{
        return await Users.findOne({ where:{
            id:id   // we can write it as id, 
        }}) 
    }

    async findByEmail(email:string) {
        return await Users.findOne({ where:{
            email:email
        }}) 
    }
   
  


    // this one generate a token thats hashed for the amount of days this login will last 
    async generateToken({id, duration}:{id: string; duration: number}) {
        const payload = {id};
        const token = jwt.sign(payload, process.env.USERS_JWT_SECRET as string, {
            expiresIn: `${duration}d`
        })
        return token;
    }
}