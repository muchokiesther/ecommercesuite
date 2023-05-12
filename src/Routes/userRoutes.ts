import { Router } from "express";
import { addUser, getAllUsers, getUsersById, updateUser ,deleteUser } from "../controllers/userController";

const userRoutes = Router()

userRoutes.post('', addUser)

userRoutes.get('',getAllUsers)

userRoutes.get('/:id',getUsersById)

userRoutes.put('/:id',updateUser)

userRoutes.delete('/:id', deleteUser)



export default userRoutes