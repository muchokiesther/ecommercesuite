

import express, {json} from 'express'
import userRoutes from './Routes/userRoutes'


import productRoutes from './Routes/productRoutes'
const app=express()
app.use(json())// middleware

app.use('/users',userRoutes)
app.use('/product',productRoutes)

app.listen(4000, ()=>{
    console.log("Server Running...")
})







