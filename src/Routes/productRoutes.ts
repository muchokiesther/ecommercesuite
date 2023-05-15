import {Router} from 'express'

import { verifyToken } from '../Middlewars/creationtaken'

import {addProduct, deleteProduct, getallProducts, getProduct, UpdateProduct} from '../controllers/productsController'


const productRoutes = Router()
// url routes
productRoutes.post('', verifyToken ,addProduct)
productRoutes.get('',getallProducts)
productRoutes.get('/:id',getProduct)
productRoutes.delete('/:id',deleteProduct)
productRoutes.put('/:id', UpdateProduct)

export default productRoutes