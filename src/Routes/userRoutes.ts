import { Router } from "express";

import { addUser, getAllUsers, getUsersById, updateUser ,deleteUser, getUsersByEmail, loginUser } from "../controllers/userController";




const userRoutes = Router()

userRoutes.post('', addUser)

userRoutes.get('',getAllUsers)

userRoutes.get('/:id',getUsersById)

userRoutes.get('/email/:email',getUsersByEmail)



userRoutes.put('/:id',updateUser)

userRoutes.delete('/:id', deleteUser)

userRoutes.post('/login', loginUser)



export default userRoutes