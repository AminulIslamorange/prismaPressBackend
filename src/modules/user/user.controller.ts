import  httpStatus  from "http-status";
import { userServices } from "./user.service";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import jwt from 'jsonwebtoken'
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

const registerUser=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
     const payload=req.body;
    const user=await userServices.registerUserIntoDB(payload)

    //  res.status(httpStatus.CREATED).json({
    //     success:true,
    //     statusCode:httpStatus.CREATED,
    //     message:'User Register successfully',
    //     data:{
    //         user
    //     }

    // })

    sendResponse(res,{
        success:true,
        statuscode:httpStatus.CREATED,
        message:"User Register Successfully",
        data:{user}
    })

});

// const registerUser=async(req:Request,res:Response)=>{
//     try {const payload=req.body;
//     const user=await userServices.registerUserIntoDB(payload)
    


//     res.status(httpStatus.CREATED).json({
//         success:true,
//         statusCode:httpStatus.CREATED,
//         message:'User Register successfully',
//         data:{
//             user
//         }

//     })
        
//     } catch (error) {
//         console.log(error)
//         res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//             success:false,
//             statusCode:httpStatus.INTERNAL_SERVER_ERROR,
//             message:"Failed to register user",
//             error:(error as Error).message
//         })
        
//     }
// }


const getMyProfile=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    // const {accessToken}=req.cookies;
    // const verifiedToken=jwtUtils.verifyToken(accessToken,config.jwt_access_secret)

    // if(typeof verifiedToken ==="string"){
    //     throw new Error(verifiedToken)
    // }
    
    const profile=await userServices.getMyProfileIntoDB(req.user?.id as string)

    sendResponse(res,{
        success:true,
        statuscode:httpStatus.OK,
        message:"User profile fetched successfully",
        data:{profile}
    })

})

export const userController={
   registerUser,getMyProfile
}