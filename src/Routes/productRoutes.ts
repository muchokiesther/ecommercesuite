import {Router} from 'express'
import {addProduct, deleleProduct, getallProducts, getProduct, updateProduct} from '../controllers/productsController'

const productRoutes = Router()
// url routes
productRoutes.post('',addProduct)
productRoutes.get('',getallProducts)
productRoutes.get('/:productid',getProduct)
productRoutes.put('/:productid',updateProduct)
productRoutes.delete('/:productid',deleleProduct)

export default productRoutes