const { request,response } = require('express')
const {cartModel} = require('../models/carts.model.js')
const {productModel} = require('../models/carts.model.js')






const addCart  = async(req= request,res= response)=>{
    try {
        const cart = await cartModel.create({})
        return res.json({msg:"Carrito creado",cart})
    } catch (error) {    
        console.log(error)
        return res.status(500).json({msg:'Server Error , agregando el carrito '})
    }
}

const getCartsbyId  = async(req= request,res= response)=>{
   try {
       const {cid} = req.params
       const cart = await cartModel.findById(cid)
       if(cart)
            return res.json({cart})
        res.status(404).json({msg:"Carrito no existe"})
    } catch (error) {    
       console.log(error)
       return res.status(500).json({msg:'Server Error , obteniendo el carrito '})
   }
}
///:cid/products/:pid'
 const addProductToCart  = async(req= request,res= response)=>{
    try {
            const {cid,pid} = req.params
            const cart = await cartModel.findById(cid)
          

            if(!cart)
                return res.status(404).json({msg:"El Carrito no existe"})            
            //const prod = cart.products.find(prod=>prod.id.toString()===pid)            
            const prodinCart = cart.products.find(prod=>prod.id.toString() === pid)            

            if(prodinCart){
                prodinCart.quantity++                
            } else {
                cart.products.push({id:pid,quantity:1})
            }
            
            cart.save()
            return res.json({msg:"Producto agregado",cart})            

    } catch (error) {    
        console.log(error)
        return res.status(500).json({msg:'Server Error , agregando el producto al carrito '})
    }
}



module.exports = {getCartsbyId,addCart,addProductToCart}

