import {Router} from 'express'
import {addItemtoCart, viewCartItems, updateCartItems, removeCartItem} from '../controllers/cartlistController'

const cartRoutes = Router()

// url routes
cartRoutes.post('/:pid', addItemtoCart)
cartRoutes.get('', viewCartItems)
cartRoutes.put('/:cid', updateCartItems)
cartRoutes.delete('/:pid', removeCartItem)


export default cartRoutes