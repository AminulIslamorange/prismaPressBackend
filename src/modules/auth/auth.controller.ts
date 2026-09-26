import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status';

const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const { accessToken, refreshToken } = await authService.loginUser(payload);
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000   //1 hour
    })
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000   //7 days
    })


    sendResponse(res, {
        success: true,
        message: 'User Login Successfully',
        statuscode: httpStatus.OK,
        data: { accessToken, refreshToken },
    })


})

const refreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const refreshToken = req.cookies.refreshToken;
    const { accessToken } = await authService.refreshToken(refreshToken);

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000   //1 hour
    })
    sendResponse(res, {
        success: true,
        statuscode: httpStatus.OK,
        message: 'token refresh successfully',
        data: { accessToken }
    })

})

export const authController = {
    loginUser, refreshToken
}