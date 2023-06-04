import {RequestHandler, Request,Response} from 'express'
import {v4 as uid} from 'uuid'
import Bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import path from 'path'
import jwt from 'jsonwebtoken'
import {RegistrationSchema, LoginSchema} from '../Helpers/usersValidation'
import {ControllerHelpers} from '../DatabaseHelpers/index'
import { User, UserExtendedRequest } from '../Interfaces'





export const loginUser = async(req:UserExtendedRequest, res:Response) => {
    try {
        
        const {email,upassword} = req.body
        // console.log("no biggie" + email + upassword)
        const {error} =  LoginSchema.validate(req.body)
        //console.log('error' + error)
        if(error){
            return res.status(404).json(error.details[0].message)
        }
        const user:User []= (await ControllerHelpers.exec('getUserByemail', { email })).recordset
        
        if(!user[0]){
            return res.status(404).json({messsage:"user not found"})
        }
        
        // console.log(upassword);
        
        // console.log(user[0].UPASSWORD)
    
            // const validpassword = await Bcrypt.compare(upassword, user[0].UPASSWORD)
            // console.log(validpassword);
            // if(!validpassword){
            //     //return res.status(404).json({message:"passwords do not match"})
            //     // console.log('not true');
                
            // }
            if(!(upassword === user[0].UPASSWORD)){
                // console.log('true')
                return res.status(404).json({message:"passwords do not match"})

            }
           
            
            const payload = user.map(usr => {
                const {UPASSWORD,...rest} = usr
                return rest
            })
                  
            const token = jwt.sign(payload[0], <string>process.env.SECRET_KEY, {expiresIn:'127800s'})
            return res.status(200).json({message:"login successfull!!", token, role:user[0].UROLE,name:user[0].USERNAME, email:user[0].EMAIL})
                 
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

export const SignupUser = async(req:UserExtendedRequest, res:Response) =>
{
    try {
        const userid = uid()
        const {username,fullname,email,phonenumber,upassword} = req.body
        const {error} = RegistrationSchema.validate(req.body)
        if(error){
            return res.status(422).json(error.details[0].message)
        }
        const hashedpwd = await Bcrypt.hash(upassword, 10)
        
        await ControllerHelpers.exec('addUserDetails' ,{userid,username,fullname,email,phonenumber,password:hashedpwd})
        return res.status(201).json( {message:"User Registered!!"} )
    } catch (error:any) {
        return res.status(500).json(error)
    }
}

export const HomePage = async(req:UserExtendedRequest, res:Response) => {
    try {
        if(req.info){
            return res.status(200).json(`Welcome ${req.info.USERNAME}`)
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}