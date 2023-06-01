import { Request, RequestHandler, Response } from "express"
import {v4 as uid} from 'uuid'
import Bcrypt from 'bcrypt'
import {LoginSchema, regSchema} from "../Helpers/usersValidation";
import jwt from 'jsonwebtoken'
import { User, UserExtendedRequest } from "../Interfaces";
import {ControllerHelpers} from  '../DatabaseHelpers';


export const addUser=async(req:Request, res:Response)=>{
    //add user logic goes here to db
    try{
        let userid = uid() // a unique id
        const { userName, fullName,  email, phoneNumber,  password } =req.body

        //validate details
        const {error}= regSchema.validate (req.body)
        if(error){
            return res.status(404).json(error.details[0].message)
        }

        let hashedPassword = await Bcrypt.hash(password,10)  //hashing your password
        //connect to db
        await ControllerHelpers.exec('addUserDetails' ,{userid,userName,fullName,email,phoneNumber,password:hashedPassword})
        return res.status(201).json( {message:"User Registered!!"} )
    }catch(error:any){
        return res.status(500).json(error.message)
    }
}

//get all users 
export const getAllUsers=async(req:Request,res:Response)=>{
 try{       
        let users:User[] = ( await ControllerHelpers.exec('getUsersData')).recordset
        return res.status(200).json(users)
        }catch(error:any){
        return res.status(500).json(error.message)
    }
}


//get one user by Id
export const getUsersById:RequestHandler<{id:string}>=async(req,res)=>{
    try{
            const{ id }=req.params
            let user:User = await (await ControllerHelpers.exec('getUserByid', { userid:id })).recordset[0]
            if(user){
                res.status(200).json(user)
            }
            return res.status(404).json({message:"id is invalid"})
        }
        catch(error:any){
           return res.status(500).json(error.message)
       }
}

   //get one user by email
export const getUsersByEmail:RequestHandler<{email:string}>=async(req,res)=>{
    try{
            const{email}=req.params
          
            let user:User []=  (await ControllerHelpers.exec('getUserByemail', { email })).recordset
            if(user.length){         
                return res.status(200).json(user)
            } 
            // else if(user.length == 0){
            //     return res.status(404).json({message: "empty array"})
            // }          
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
             let user:User[] = (await ControllerHelpers.exec('getUserByid', { userid:id })).recordset
            if(!user.length){
                return res.status(404).json({message:"User not found"})

            }
            const {userName, fullName, email, phoneNumber, password, urole } = req.body
            await ControllerHelpers.exec('updateUserDetails' ,{userid:id,userName,fullName,email,phoneNumber,password,urole})
            return res.status(200).json({message:"User updated successfully"})
        }
        catch(error:any){
            return res.status(500).json(error.message)
        }
}
   

//delete User
export const deleteUser = async (req:Request<{id:string}> , res:Response) =>{

    try {
        const {id} = req.params
        let user:User[] = (await ControllerHelpers.exec('getUserByid', { userid:id })).recordset
       
        if(!user.length){
            return res.status(404).json({message:"User does not exist"})
        }
        await ControllerHelpers.exec('deleteUserDetails',{userid:id})
        return res.status(200).json({message: "User deleted Successfully"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    } 

}


export const loginUser = async(req:Request, res:Response) => {
        try {
          
            const {email,password} = req.body as {email:string, password:string}
            const {error} =  LoginSchema.validate(req.body)
            if(error){
                return res.status(422).json(error.details[0].message)
            }
            let user:User []=  (await ControllerHelpers.exec('getUserByemail', { email })).recordset
            if(!user[0]){
                return res.status(404).json({messsage:"user not found"})
            }
            
                let validpassword = await Bcrypt.compare(password, user[0].password)
                if(!validpassword){
                    return res.status(404).json({message:"passwords do not match"})
                }
                const payload = user.map(usr => {
                    const {password,...rest} = usr
                    return rest
                })
                      
                const token = jwt.sign(payload[0], <string>process.env.SECRET_KEY, {expiresIn:'127800s'})
                return res.json({message:"login successfull!!", token, role:user[0].roles,name:user[0].userName})
                     
        } catch (error:any) {
            return res.status(500).json(error.message)
        }
}
//reset users

// export const resetPassword = async (req:UserExtendedRequest, res: Response) => {
//     try {
//         const { email,password } = req.body;
//         const {error} =  resetSchema.validate(req.body)
//         if(error){
//             return res.status(400).json(error.details[0].message)
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
  
//         const result =await ControllerHelpers.exec('resetUserPassword' ,{email,password:hashedPassword})
//         if(result.rowsAffected[0]>0){
//             return res.status(200).json({ message: "User Password Updated" });
//         }
//         else{
//             return res.status(404).json({message:"user not found"})
//         }      
//     } 
//     catch (error: any) {
//       return res.status(500).json(error.message);
//     }
//   };





   
