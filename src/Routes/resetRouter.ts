import  { Router } from 'express';
import {  forgotPassword, resetPassword } from '../controllers/userController';
//import {generateToken}from '../EmailServices/resetControllers'
const resetRouter = Router();

resetRouter.get('/forgot', forgotPassword)
resetRouter.put('/email' ,resetPassword); //check email....not id

export default resetRouter;
