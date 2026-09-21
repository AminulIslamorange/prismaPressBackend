import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { RegisterUserPayload } from "./user.interface";

const registerUserIntoDB=async(payload:RegisterUserPayload)=>{
    const {name,email,password,profilePhoto}=payload;
    const userExists=await prisma.user.findUnique({
        where:{email}
    })
    if(userExists){
        throw new Error("user with this email already exits")
    }
    const hashedPassword=await bcrypt.hash(password,Number(config.bcrypt_salt_rounds))

    const createUser=await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword,
            
        }
    }

    )
   await prisma.profile.create({
        data:{
            userId:createUser.id,
            profilePhoto,
            
        }
    })

    const user=await prisma.user.findUnique({
        where:{
            id:createUser.id,
            email:createUser.email ||email
        },
        omit:{
            password:true
        },
        include:{
            profile:true}
    })
    return user;
};


export const userServices={
    registerUserIntoDB
}
