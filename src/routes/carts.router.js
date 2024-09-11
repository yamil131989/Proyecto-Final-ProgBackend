const { Router } = require('express')
const {getCartsbyId,addProductToCart,addCart,deleteProductinCart,updateproductinCart,deleteCart} = require('../daos/carts.dao.js')

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
router.delete('/:cid/products/:pid', deleteProductinCart)
//PUT api/carts/:cid
router.put('/:cid/products/:pid',updateproductinCart)
router.delete('/:cid',deleteCart)

module.exports = router
