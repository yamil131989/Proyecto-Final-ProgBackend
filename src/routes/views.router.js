const { Router } = require('express')
const { productModel } = require('../models/products.model.js')
const {getProductsHandle} = require('../daos/products.dao.js')
const {getCartsbyIdHandle} = require('../daos/carts.dao.js')


const router = Router()


router.get('/',async (req,res)=>{
 //    const productos = await prodManagerFS.getProducts()  
    const productos = await productModel.find().lean()
    //
    return res.render('home',{productos,styles:"styles.css"})
})
 
router.get('/realtimeproducts',async (req,res)=>{
    

   //return res.render('realTimeProducts',{productos,styles:'styles.css'})
   return res.render('realTimeProducts')

})

router.get('/products', async(req,res)=>{
   //const {limit,page,sort,query} = req.params
   
   //const productos = await productModel.find().lean()
   const producResult = await getProductsHandle({...req.query})


   return res.render('products',{title:'Productos',producResult})
})

router.get('/carts/:cid', async (req, res)=>{
   const {cid} = req.params
   console.log(cid)
   const cartResult = await getCartsbyIdHandle(cid)
   
   return res.render('carts',{title:'Carts', cartResult})
})
module.exports = router;
