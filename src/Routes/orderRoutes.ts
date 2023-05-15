import { Router } from "express";
import { UpdateOrders, createOrder, deleteOrder, getAllOrders, getOrderById } from "../controllers/orderscontroller";
import { verifyToken } from "../Middlewars/creationtaken";


const orderRoutes = Router()
orderRoutes.post('', createOrder)
orderRoutes.get('',getAllOrders)
orderRoutes.get('/:id',getOrderById)
orderRoutes.delete('/:id',deleteOrder)
orderRoutes.put('/:orderid',verifyToken, UpdateOrders)
export default orderRoutes