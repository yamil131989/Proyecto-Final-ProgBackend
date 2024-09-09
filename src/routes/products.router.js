const { Router } = require('express')
const { error } = require('console')
const { getProducts,getProduct,addProduct,updateProduct,deleteProduct } = require('../daos/products.dao.js')


const router = Router()

router.get('/', getProducts) 

router.get('/:id', getProduct) 

router.post('/', addProduct) 

router.put('/:id',updateProduct) 

router.delete('/:id',deleteProduct) 

module.exports = router
