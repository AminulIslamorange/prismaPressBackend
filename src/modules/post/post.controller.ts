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

const getPostById=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const postId=req.params.postId;
    if(!postId){
        throw new Error ("Post id required")
    }
    const result=await postService.getPostById(postId as string)


    sendResponse(res,{
        success:true,
        statuscode:httpStatus.OK,
        message:"Post retrive successfully",
        data:result
    })

})


const getMyPosts=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const authorId=req.user?.id;
    const result=await postService.getMyPosts(authorId as string)


    sendResponse(res,{
        success:true,
        statuscode:httpStatus.OK,
        message:"My Post retrieved successfully",
        data:result
    })

})

const updatePost =catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const authorId=req.user?.id;
    const isAmin=req.user?.role ==="ADMIN";
    const postId=req.params.postId;
    const payload=req.body;
    const result=await postService.updatePost(postId as string,payload,authorId as string,isAmin)


    sendResponse(res,{
        success:true,
        statuscode:httpStatus.OK,
        message:" Post updated successfully",
        data:result
    })

})
const deletePost = catchAsync(async (req : Request, res : Response, next : NextFunction) => {
    const authorId = req.user?.id
    const isAdmin = req.user?.role === "ADMIN";

    const postId = req.params.postId;
    if (!postId) {
        throw new Error("Post Id Required In Params")
    }

    await postService.deletePost(postId as string, authorId as string, isAdmin)

    sendResponse(res, {
        success: true,
        statuscode: httpStatus.OK,
        message: "Post deleted successfully",
        data: null
    })
})

const getPostsStats = catchAsync(async (req : Request, res : Response, next : NextFunction) => {
    const result = await postService.getPostsStats();

    sendResponse(res, {
        success: true,
        statuscode: httpStatus.OK,
        message: "Post stats retrieved successfully",
        data: result
    })
})




export const postController = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
     getPostsStats,
    getMyPosts
}