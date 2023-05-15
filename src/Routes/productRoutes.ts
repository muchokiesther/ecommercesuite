import {Router} from 'express'
import {addProduct, deleleProduct, getallProducts, getProduct, updateProduct} from '../controllers/productsController'
import { verifyToken } from '../Middlewars/creationtaken'

const productRoutes = Router()
// url routes
productRoutes.post('', verifyToken ,addProduct)
productRoutes.get('',getallProducts)
productRoutes.get('/:productid',getProduct)
productRoutes.put('/:productid',updateProduct)
productRoutes.delete('/:productid',deleleProduct)

export default productRoutes