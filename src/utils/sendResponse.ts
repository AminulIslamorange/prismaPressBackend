import { Response } from "express";
import  httpStatus  from "http-status";
type TMeta={
    page:number;
    limit:number;
    total:number;

}
type TResponseData<T>={
    success:boolean;
    statuscode:number;
    message:string;
    data?:T;
    meta?:TMeta;
    error?:string;
}
export const sendResponse=<T>(res:Response,data:TResponseData<T>)=>{
    res.status(data.statuscode).json({
      success:data.success,
      statusCode:data.statuscode,
      message:data.message,
      data:data.data,
      meta:data.meta  
    })
}
