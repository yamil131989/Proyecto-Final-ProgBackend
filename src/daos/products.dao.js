const { request,response } = require('express')

const {productModel} = require('../models/products.model.js')
const { Query } = require('mongoose')

const getProducts = async (req = request,res=response) =>{
    try {
        let { limit , page = 1, query ,sort} = req.query
        page= page==0 ? 1 :page
        page = Number(page)

        limit = Number(limit)
       
        const Tdocs = (page - 1) * Number(limit)

        const OrdenSort = {'asc':-1,'desc':1}
        sort = OrdenSort[sort] || null

        if(query){
            query = JSON.parse(decodeURIComponent(query))
        } else { 
            query = {}
        }
        

        const total = await productModel.countDocuments()
        let products = await productModel.find(query).limit(Number(limit)).skip(Tdocs)            
        

        if(sort !== null){
           products = await productModel.find(query).limit(Number(limit)).skip(Tdocs).sort({price:sort})
        } 
        
        
        //paginado
        const totalPages = Math.ceil(total/Number(limit))        
        
        const hasPrevPage = page > 1
        const hasNextPage = page < totalPages
        const prevPage = hasPrevPage ? page -1 : null
        const nextPage = hasNextPage ? page +1 :null

        //const prevLink = hasPrevPage ? `/products?limit=${Number(limit)}&page=${prevPage}&query=${query}&sort=${sort}` : null
        const prevLink = hasPrevPage ? `/products?limit=${Number(limit)}&page=${prevPage}` : null
//        const nextLink = hasNextPage ? `/products?limit=${Number(limit)}&page=${nextPage}&query=${query}&sort=${sort}` : null;
        const nextLink = hasNextPage ? `/products?limit=${Number(limit)}&page=${nextPage}` : null;


        const objeto = {
            status: true,
            payload: products,
            totalPages:0,
            prevPage,
            nextPage,
            page:page,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink
        }
        const result = {
            Tdocs,
            total,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink,
            payload: products
        }

        return res.json({result})



    } catch (error) {    
        console.log(error)       
    }
        
}

 const getProduct = async (req = request,res=response) =>{
    try {
        const { id } = req.params
        const product = await productModel.findById(id)       
        if(!product)
            return res.status(404).json({msg:"El producto no existe"})
        return res.json({product})
        } catch (error) {    
        console.log(error)        
    }
        
}

 const addProduct = async (req = request,res=response) =>{
    try {
        const {title,description,code,price,stock,status,thumbnail,category,create} = req.body
        if(!title,!description,!code,!price,!stock,!status,!category)
            return res.status(500).json({msg:'Faltan datos para ingresar el producto'})
        const product = await productModel.create({title,description,code,price,stock,status,thumbnail,category,create})        
        return res.json({product})
    } catch (error) {    
        console.log(error)
    
    }
        
}


 const deleteProduct = async (req = request,res=response) =>{
    try {
        const {id}  = req.params
        const product = await productModel.findByIdAndDelete(id)
        if(!product)
            return res.status(404).json({msg:'Product not found'})    
        return res.json({msg:'El producto ha sido eliminado',product})        
    } catch (error) {    
        console.log(error)
    
    }
        
}
const updateProduct = async (req = request,res=response) =>{
    try {
        const {id} = req.params
        const {_id, ...rest} = req.body

        const product = await productModel.findByIdAndUpdate(id, {...rest},{new:true}) //doc

        if(product)
            return res.json({msg:'Producto actualizado',product})        
        return res.json(409).json({msg:'Error al actualizar el producto'})    
    } catch (error) {    
        console.log(error)
        
    }
        
}

const getProductsHandle = async ({limit=10,page,sort,query}) =>{
    try {        
        
        if(!page)
            page = 0
        page = page == 0 ? 1 : page
        page = Number(page)

        limit = Number(limit)        
        const Tdocs = (page - 1) * Number(limit)

        const OrdenSort = { 'asc': -1, 'desc': 1}
        sort = OrdenSort[sort] || null       
    
        try {
            if(query)
                query = JSON.parse(decodeURIComponent(query))
        } catch (error) {
            console.log(error)
            query = {}
        }              
        

        const total = await productModel.countDocuments()
        
        const queryProducts = await productModel.find(query).limit(limit).skip(Tdocs).lean()            
        
        

        if (sort !== null)
            queryProducts.sort({ price : sort })  
    
        const queryProductsUpd = queryProducts

        //paginado
        const totalPages = Math.ceil(total/limit)        
        
        const hasPrevPage = page > 1
        const hasNextPage = page < totalPages
        const prevPage = hasPrevPage ? page -1 : null
        const nextPage = hasNextPage ? page +1 :null

        //const prevLink = hasPrevPage ? `/products?limit=${Number(limit)}&page=${prevPage}&query=${query}&sort=${sort}` : null
        const prevLink = hasPrevPage ? `/products?limit=${Number(limit)}&page=${prevPage}` : null
//        const nextLink = hasNextPage ? `/products?limit=${Number(limit)}&page=${nextPage}&query=${query}&sort=${sort}` : null;
        const nextLink = hasNextPage ? `/products?limit=${Number(limit)}&page=${nextPage}` : null;


        
    return result = {
        Tdocs,
        limit,
        total,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink,
        query:JSON.stringify(query),
        payload: queryProductsUpd
    }

        //return res.json({result})



    } catch (error) {    
        console.log(error)       
    }
        
}

const getProducthandler = async (pid) =>{
    try {
        const product = await productModel.findById(pid).lean()
        
        return product
        } catch (error) {    
        console.log(error)        
    }
        
}
module.exports = {updateProduct,deleteProduct,addProduct,getProduct,getProducts,getProductsHandle,getProducthandler }
