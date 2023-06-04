import { Router } from "express";

import { addUser, getAllUsers, getUsersById, updateUser ,deleteUser, getUsersByEmail } from "../controllers/userController";
import { verifyToken } from "../Middlewars/creationtaken";




const userRoutes = Router()

userRoutes.post('', addUser)

userRoutes.get('',getAllUsers)

userRoutes.get('/:id',getUsersById)

userRoutes.get('/email/:email',getUsersByEmail)
userRoutes.put('/:id',updateUser)

userRoutes.delete('/:id', deleteUser)




export default userRoutes