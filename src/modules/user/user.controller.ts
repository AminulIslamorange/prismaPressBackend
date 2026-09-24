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

    sendResponse(res,{
        success:true,
        statuscode:httpStatus.CREATED,
        message:"User Register Successfully",
        data:{user}
    })

});




const getMyProfile=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
 
    const profile=await userServices.getMyProfileIntoDB(req.user?.id as string)

    sendResponse(res,{
        success:true,
        statuscode:httpStatus.OK,
        message:"User profile fetched successfully",
        data:{profile}
    })

})


const updateProfile=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const userId=req.user?.id as string;
    const payload=req.body;
    const updatedProfile=await userServices.updateMyProfileIntoDB(userId,payload);


    sendResponse(res,{
        success:true,
        statuscode:httpStatus.OK,
        message:"User Profile Updated Successfully",
        data:{updatedProfile}
    })

})

export const userController={
   registerUser,getMyProfile,updateProfile
}