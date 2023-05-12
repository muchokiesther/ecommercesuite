import { Request, RequestHandler, Response } from "express"
import mssql from 'mssql'
import { sqlConfig } from "../config";
import {v4 as uid} from 'uuid'
import bcrypt from 'bcrypt'
import {regSchema} from "../Helpers/usersValidation";
import jwt from 'jsonwebtoken'
import { Console, error, log } from "console";

interface ExtendedRequest extends Request{
body:{
    userName:string
    fullName:string
    email:string
    phoneNumber:number
    password:string

}
}

interface User{
    id:string
    userName:string
    fullName:string
    email:string
    phoneNumber:number
    password:string
    isDeleted:number
}


export const addUser=async (req:Request, res:Response)=>{
    //add user logic goes here to db
    try{
        let id = uid() // a unique id

        const { userName, fullName,  email, phoneNumber,  password } =req.body

        //validation my registered users
       const {error}= regSchema.validate (req.body)
        if(error){
            return res.status(404).json(error.details[0].message)
        }


        let hashedPassword = await bcrypt.hash(password,10)  //hashing your password
        //connect to db
        const pool = await mssql.connect(sqlConfig)
        //make a request to user
        await pool.request()
        .input ('id', mssql.VarChar ,id)
         .input ('userName', mssql.VarChar ,userName)
          .input ('fullName', mssql.VarChar , fullName)
           .input ('email', mssql.VarChar ,email)
            .input ('phoneNumber', mssql.Int ,phoneNumber)
             .input ('password', mssql.VarChar , hashedPassword)
        .execute('adduser')

        return res.status(500).json( {message:"User Registered!!"} )


    }catch(error:any){
        return res.status(500).json(error.message)
    }
}

//get all users 
export const getAllUsers:RequestHandler=async(req,res)=>{
 try{
        const pool = await mssql.connect(sqlConfig)
       
        let users:User[] =(await(pool.request()).execute('getUsers')).recordset
        res.status(200).json(users)

        }catch(error:any){
        return res.status(500).json(error.message)
    }
}


//get one user by Id
export const getUsersById:RequestHandler<{id:String}>=async(req,res)=>{
    try{
            const{id}=req.params
           const pool = await mssql.connect(sqlConfig)

           let user:User =(await(await pool.request())
           .input('id', id)
           .execute('getUserById')).recordset[0]
           res.status(200).json(user)
   
           }catch(error:any){
           return res.status(500).json(error.message)
       }
   }

   //get one user by email
export const getUsersByEmail:RequestHandler<{email:string}>=async(req,res)=>{
    try{
            const{email}=req.params
           const pool = await mssql.connect(sqlConfig)
           let user:User[] =(await(pool.request())
           .input('email', email)
           .execute('getUserByEmail')).recordset
           if(user){
         
            return res.status(200).json(user)

           }
           
           return res.status(404).json({message:"user not found"})

   
           }catch(error:any){
           return res.status(500).json(error.message)
       }
   }


   //update user
   export const updateUser = async(req:Request<{id:string}>,res:Response) =>{
    try{
            const pool = await mssql.connect(sqlConfig)
            const {id} = req.params
            let user:User[] = (await (pool.request())
            .input('id', id)
            .execute('getUserById')).recordset
            if(!user.length){
                return res.status(404).json({message:"User not found"})

            }
            const {userName, fullName, email, phoneNumber, password} = req.body
            await pool.request()
            .input('id',id)
            .input('userName',userName)
            .input('fullName',fullName)
            .input('email',email)
            .input('phoneNumber',phoneNumber)
            .input('password',password)
            .execute('updateUser')
            return res.status(200).json({message:"User updated successfully"})
    }catch(error:any){
        return res.status(500).json(error.message)
    }
   }
   

   //delete User
   export const deleteUser = async (req:Request <{id:string}> , res:Response) =>{

    try {
        const pool = await mssql.connect(sqlConfig)
        const{id} = req.params
        let user:User[] = (await (pool.request() ) .input('id', id)
        .execute('getUserById')).recordset
        if(!user.length){
            return res.status(404).json({message:"User does not exist"})
        }
        await pool.request().input('id',id).execute('deleteUser')
        return res.status(200).json({message: "User deleted Successfully"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    } 

   }


   export const loginUser = async(req:Request, res:Response) => {
        try {
            const pool = await mssql.connect(sqlConfig)
            const {email,password} = req.body as {email:string, password:string}
            let user:User[] = await(await pool.request()
            .input('email',email)
            .execute('getUserByEmail')).recordset
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
            const token = jwt.sign(payload[0], <string>process.env.SECRET_KEY, {expiresIn:'172800s'})
            return res.json({message:"login successfull!!", token})
        } catch (error:any) {
            return res.status(500).json(error.message)
        }
   }



   
