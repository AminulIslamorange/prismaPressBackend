import { NextFunction, Request, Response, } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { postService } from "./post.service"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from 'http-status'




const createPost=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const id=req.user?.id

    const payload=req.body;
    const result=await postService.createPost(payload,id as string)

    sendResponse(res,{
        success:true,
        statuscode:httpStatus.CREATED,
        message:"Post created Successfully",
        data:result

    })
})
const  getAllPosts=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const result=await postService.getAllPosts();
    sendResponse(res,{
        success:true,
        statuscode:httpStatus.OK,
        message:"User All Post",
        data:result
    })

})



export const postController = {
    createPost,
    getAllPosts,
    // getPostById,
    // updatePost,
    // deletePost,
    // getPostsStats,
    // getMyPosts
}