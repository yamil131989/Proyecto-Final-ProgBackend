const { Router } = require('express')
const { productModel } = require('../models/products.model.js')


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

module.exports = router;
