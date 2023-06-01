import { Router } from "express";

import { addUser, getAllUsers, getUsersById, updateUser ,deleteUser, getUsersByEmail, loginUser, resetPassword } from "../controllers/userController";
import { verifyToken } from "../Middlewars/creationtaken";




const userRoutes = Router()

userRoutes.post('', addUser)

userRoutes.get('',getAllUsers)

userRoutes.get('/:id',getUsersById)

userRoutes.get('/email/:email',getUsersByEmail)
userRoutes.put('/:id',updateUser)

userRoutes.delete('/:id', deleteUser)

userRoutes.post('/login', loginUser)
userRoutes.put('/reset/:id', resetPassword)



export default userRoutes