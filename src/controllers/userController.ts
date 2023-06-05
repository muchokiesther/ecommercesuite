import mssql from 'mssql'
import { Request, RequestHandler, Response } from "express"
import {v4 as uid} from 'uuid'
import Bcrypt from 'bcrypt'
import {RegistrationSchema} from "../Helpers/usersValidation";
import jwt from 'jsonwebtoken'
import { User, UserExtendedRequest } from "../Interfaces";
import {ControllerHelpers} from  '../DatabaseHelpers';

import { Console, error, log } from "console";
import ejs from 'ejs'
import { sqlConfig } from "../config";


export const addUser=async(req:Request, res:Response)=>{
    //add user logic goes here to db
    try{
        let userid = uid() // a unique id
        const { userName, fullName,  email, phoneNumber,  password } =req.body

        //validate details
        const {error}= RegistrationSchema.validate (req.body)
        if(error){
            return res.status(404).json(error.details[0].message)
        }

        let hashedPassword = await Bcrypt.hash(password,10)  //hashing your password
        //connect to db
        await ControllerHelpers.exec('addUserDetails' ,{userid,userName,fullName,email,phoneNumber,password:hashedPassword})
        return res.status(201).json( {message:"User Registered!!"} )

    }catch(error:any){
        return res.status(500).json({message:error.message})
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
            const {username, fullname, email, phonenumber, upassword, urole } = req.body
            await ControllerHelpers.exec('updateUserDetails' ,{userid:id,username,fullname,email,phonenumber,password:upassword,urole})
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
          //  const pool = await mssql.connect(sqlConfig)
            const {email,password} = req.body as {email:string, password:string}
            let user:User []= await (await ControllerHelpers.exec('getUserByEmail', { email })).recordset
            if(!user[0]){
                return res.status(404).json({messsage:"user not found"})
            }
            let validpassword = await Bcrypt.compare(password, user[0].UPASSWORD)
            if(!validpassword){
                return res.status(404).json({message:"user not found"})
            }
            const payload = user.map(usr => {
              const {  UPASSWORD, ...rest } = usr;
              return  rest; // Added the roles fiels
            });
            
            // tokening
            console.log();
            
            const token = jwt.sign(payload[0], <string>process.env.SECRET_KEY, {expiresIn:'172800s'})
            return res.json({message:"login successfull!!", token,roles:payload[0].UROLE,username:payload[0].USERNAME})
        } catch (error:any) {
            return res.status(500).json({message:error.message})
        }
   }


  //forgot password
  export const forgotPassword = async (req: UserExtendedRequest, res: Response) => {
    try {
      let link = ''
      const { email } = req.query as {email:string}
      const pool = await mssql.connect(sqlConfig);
      let user: User[] = (await (await pool.request()).input("email", email).execute("getUserByEmail")).recordset;
      console.log(user);
  
      if (!user[0]) {
        return res.status(404).json({ message: "User was not found" });
      }
  
       
      // for (let userRecord of user) {
      //   ejs.renderFile('dist/Templates/welcome.ejs', { name: userRecord.fullName }, async (err, html) => {
      //     if (err) {
      //       console.error("Error rendering email template:", err);
      //       return;
      //     }
      //     try {
      //       let messageOptions = {
      //         from: "muchokiesther8gmail.com",
      //         to: userRecord.email,
      //         subject: "Welcome Email",
      //         html
      //       }
      //       await sendMail(messageOptions);
      //       await pool.request().query(`UPDATE users SET emailSent=1 WHERE id='${userRecord.id}'`);
      //     } catch (error) {
      //       console.error("Error sending email:", error);
      //     }
      //   }
      //   );
      // }

      //const token = jwt.sign(payload[0], <string>process.env.SECRET_KEY, {expiresIn:'1h'})
 
      await pool.request().query(`UPDATE users SET emailSent=1 WHERE id='${user[0].USERID}'`);
  
      return res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Failed to send email" });
    }
  };



//reset users

export const resetPassword = async (req:UserExtendedRequest, res: Response) => {
    try {
        const { email,upassword } = req.body;
        //const {error} =  resetSchema.validate(req.body)
        // if(error){
        //     return res.status(400).json(error.details[0].message)
        // }
        const hashedPassword = await Bcrypt.hash(upassword, 10);
  
        const result =await ControllerHelpers.exec('resetUserPassword' ,{email,password:hashedPassword})
        if(result.rowsAffected[0]>0){
            return res.status(200).json({ message: "User Password Updated" });
        }
        else{
            return res.status(404).json({message:"user not found"})
        }      
    } 
    catch (error: any) {
      return res.status(500).json(error.message);
    }
  };





   
