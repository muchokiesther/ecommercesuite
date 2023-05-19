import {Router} from 'express'

import { verifyToken } from '../Middlewars/creationtaken'

import {addProduct, deleteProduct, getallProducts, getProduct, UpdateProduct} from '../controllers/productsController'


const productRoutes = Router()
// url routes
productRoutes.post('', verifyToken ,addProduct)
productRoutes.get('',getallProducts)
productRoutes.get('/:pid',getProduct)
productRoutes.delete('/:pid',verifyToken ,deleteProduct)
productRoutes.put('/:pid',verifyToken, UpdateProduct)

export default productRoutes