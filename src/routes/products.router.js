const { Router } = require('express')
const { error } = require('console')
const { getProducts,getProduct,addProduct,updateProduct,deleteProduct } = require('../daos/products.dao.js')
//const { ProductsDao } = require('../daos/products.dao')

const router = Router()

router.get('/', getProducts) //bien

router.get('/:id', getProduct) //mal

router.post('/', addProduct) //bien

router.put('/:id',updateProduct) //mal

router.delete('/:id',deleteProduct) //mal

module.exports = router
