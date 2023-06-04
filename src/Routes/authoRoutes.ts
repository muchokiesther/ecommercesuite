import { Router } from "express";
import { loginUser, SignupUser, HomePage } from "../controllers/authController";
import { verifyToken } from "../Middlewars/creationtaken";



const authorouter = Router()

authorouter.post('/sign-up', SignupUser)
authorouter.post('/login', loginUser)
authorouter.get('/home', verifyToken, HomePage)

export default authorouter