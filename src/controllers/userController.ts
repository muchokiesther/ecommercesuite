import { Request, RequestHandler, Response } from "express"
import {v4 as uid} from 'uuid'
import bcrypt from 'bcrypt'
import {regSchema, resetSchema} from "../Helpers/usersValidation";
import jwt from 'jsonwebtoken'
import { User, UserExtendedRequest } from "../Interfaces";
import {ControllerHelpers} from  '../DatabaseHelpers';


export const addUser=async (req:Request, res:Response)=>{
    //add user logic goes here to db
    try{
        let userid = uid() // a unique id
        const { userName, fullName,  email, phoneNumber,  password } =req.body

        //validation my registered users
        const {error}= regSchema.validate (req.body)
        if(error){
            return res.status(404).json(error.details[0].message)
        }

        let hashedPassword = await bcrypt.hash(password,10)  //hashing your password
        //connect to db
        await ControllerHelpers.exec('adduser' ,{userid,userName,fullName,email,phoneNumber,password:hashedPassword})
        return res.status(201).json( {message:"User Registered!!"} )


    }catch(error:any){
        return res.status(500).json(error.message)
    }
}

//get all users 
export const getAllUsers:RequestHandler=async(req,res)=>{
 try{
       // const pool = await mssql.connect(sqlConfig)
       
        let users:User[] = ( await ControllerHelpers.exec('getUsers')).recordset
        res.status(200).json(users)

        }catch(error:any){
        return res.status(500).json(error.message)
    }
}


//get one user by Id
export const getUsersById:RequestHandler<{id:String}>=async(req,res)=>{
    try{
            const{ id }=req.params
            let user:User = await (await ControllerHelpers.exec('getUserById', { id })).recordset[0]
            if(user){
                res.status(200).json(user)
            }
        }
        catch(error:any){
           return res.status(500).json(error.message)
       }
}

   //get one user by email
export const getUsersByEmail:RequestHandler<{email:string}>=async(req,res)=>{
    try{
            const{email}=req.params
          
            let user:User []=  (await ControllerHelpers.exec('getUserByEmail', { email })).recordset
            if(user){         
                return res.status(200).json(user)
            }           
            return res.status(404).json({message:"user not found"})   
        }
        catch(error:any){
           return res.status(500).json(error.message)
       }
}


//update user
export const updateUser = async(req:Request<{id:string}>,res:Response) =>{
    try{
           // const pool = await mssql.connect(sqlConfig)
            const {id} = req.params
             let user:User[] = (await ControllerHelpers.exec('getUserById', { id })).recordset
            if(!user.length){
                return res.status(404).json({message:"User not found"})

            }
            const {userName, fullName, email, phoneNumber, password} = req.body
            await ControllerHelpers.exec('updateUser' ,{id,userName,fullName,email,phoneNumber,password})
            return res.status(200).json({message:"User updated successfully"})
        }
        catch(error:any){
            return res.status(500).json(error.message)
        }
}
   

//delete User
export const deleteUser = async (req:Request<{id:string}> , res:Response) =>{

    try {
        const{id} = req.params
        let user:User[] = (await ControllerHelpers.exec('getUserById', { id })).recordset
       
        if(!user.length){
            return res.status(404).json({message:"User does not exist"})
        }
        await ControllerHelpers.exec('deleteUser',{id})
        return res.status(200).json({message: "User deleted Successfully"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    } 

}


export const loginUser = async(req:Request, res:Response) => {
        try {
          
            const {email,password} = req.body as {email:string, password:string}
            let user:User []= await (await ControllerHelpers.exec('getUserByEmail', { email })).recordset
            if(!user[0]){
                return res.status(404).json({messsage:"user not found"})
            }
            let validpassword = await bcrypt.compare(password, user[0].password)
            if(!validpassword){
                return res.status(404).json({message:"user not found"})
            }
            const payload = user.map(usr => {
                const {password,isDeleted,phoneNumber,...rest} = usr
                return rest
            })
            // tokening
            // console.log();
            
            const token = jwt.sign(payload[0], <string>process.env.SECRET_KEY, {expiresIn:'172800s'})
            return res.json({message:"login successfull!!", token})
        } catch (error:any) {
            return res.status(500).json(error.message)
        }
}
//reset users

export const resetPassword = async (req:UserExtendedRequest, res: Response) => {
    try {
        const { email,password } = req.body;
        const {error} =  resetSchema.validate(req.body)
        if(error){
            return res.status(400).json(error.details[0].message)
        }
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const result =await ControllerHelpers.exec('resetPassword' ,{email,password:hashedPassword})
        if(result.rowsAffected[0]>0){
            return res.status(200).json({ message: "User Password Updated" });
        }
        else{
            return res.status(404).json({message:"user not found"})
        }
      
    } 
    catch (error: any) {
      return res.status(500).json({ message: "Failed to reset password" });
    }
  };





   
