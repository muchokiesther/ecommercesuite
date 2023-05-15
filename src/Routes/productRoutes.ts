import {Router} from 'express'
import {addProduct, deleteProduct, getallProducts, getProduct, UpdateProduct} from '../controllers/productsController'

const productRoutes = Router()
// url routes
productRoutes.post('',addProduct)
productRoutes.get('',getallProducts)
productRoutes.get('/:id',getProduct)
productRoutes.delete('/:id',deleteProduct)
productRoutes.put('/:id', UpdateProduct)

export default productRoutes