

import express, {json} from 'express'
import userRoutes from './Routes/userRoutes'
import cartRoutes from './Routes/cardListRoutes'

import productRoutes from './Routes/productRoutes'
const app=express()
app.use(json())// middleware

app.use('/users',userRoutes)
app.use('/products',productRoutes)
app.use('/cart', cartRoutes)

app.listen(4000, ()=>{
    console.log("Server Running...")
})







