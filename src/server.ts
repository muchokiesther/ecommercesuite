import express, {json} from 'express'
import userRoutes from './Routes/userRoutes'
import cartRoutes from './Routes/cardListRoutes'
import orderRoutes from './Routes/orderRoutes'
import productRoutes from './Routes/productRoutes'
import authorouter  from './Routes/authoRoutes'

import cors from 'cors'

const app=express()


app.use(cors())
app.use(json())// middleware


app.use('/users',userRoutes)
app.use('/products',productRoutes)
app.use('/cart', cartRoutes)
app.use('/orders', orderRoutes)
app.use('/auth', authorouter)





app.listen(8080, ()=>{
    console.log("Server Running...")
})







