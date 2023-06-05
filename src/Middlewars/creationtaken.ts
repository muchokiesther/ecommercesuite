import jwt from 'jsonwebtoken'
import {NextFunction,Request,Response} from 'express'
import dotenv from 'dotenv'
import path from 'path'

import { DecodedData } from '../Interfaces'


dotenv.config({path:path.resolve(__dirname, '../../.env')})

interface TokenRequest extends Request{
    info?:DecodedData
}

export const verifyToken = (req:TokenRequest , res:Response, next:NextFunction) => {
    const token = req.headers['token'] as string
    try {
        
        if(!token){
            return res.status(401).json({message:'unathorized'})
        }
        // is token expired or valid
        const dedata = jwt.verify(token, process.env.SECRET_KEY as string) as DecodedData
        req.info=dedata
        
    } catch (error:any) {
        return res.status(403).json(error.message)
    }
    next()
}
