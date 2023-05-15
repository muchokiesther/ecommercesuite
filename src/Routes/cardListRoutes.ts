import {Router} from 'express'
import {addItemtoCart, viewCartItems, updateCartItems, removeCartItem} from '../controllers/cartlistController'

const cartRoutes = Router()

// url routes
cartRoutes.post('/:id', addItemtoCart)
cartRoutes.get('', viewCartItems)
cartRoutes.put('/:id', updateCartItems)
cartRoutes.delete('/:id', removeCartItem)


export default cartRoutes