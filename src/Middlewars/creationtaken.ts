import jwt from 'jsonwebtoken'
import {NextFunction,Request,Response} from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { userInfo } from 'os'


dotenv.config({path:path.resolve(__dirname, '../../.env')})

interface DecodeData {
    id:string
    userName:string
    fullName:string
    email:string
}

interface ExtendedRequest extends Request {
    info?:DecodeData
}

export const verifyToken = (req:ExtendedRequest, res:Response, next:NextFunction) => {
    try {
        const token = req.headers['token'] as string
        if(!token){
            return res.status(401).json({message:'unathorized'})
        }
        // is token expired or valid
        const dedodedData = jwt.verify(token, process.env.SECRET_KEY as string) as DecodeData
        req.info=dedodedData
        
    } catch (error:any) {
        return res.status(403).json({message:error.message})
    }
    next()
}
