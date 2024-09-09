const { Router } = require('express')
const {getCartsbyId,addProductToCart,addCart} = require('../daos/carts.dao.js')

const router = Router()

//POST /api/carts/
//GET /:cid
//POST /:cid/product/:pid 

    
// })
//crear carrito
router.post('/', addCart)
//obtener carrito por id
router.get('/:cid', getCartsbyId)

//agregar prod al carrito
router.post('/:cid/products/:pid', addProductToCart)


module.exports = router
