import  { Router } from 'express';
import {  resetPassword } from '../controllers/userController';
//import {generateToken}from '../EmailServices/resetControllers'
const resetRouter = Router();


resetRouter.put('/email' ,resetPassword); //check email....not id

export default resetRouter;
