// import cart collection
const carts = require('../models/cartSchema')

// add to cart
exports.addToCart = async (req,res)=>{
    // get product details from req
    const {id,title,image,price,quantity} = req.body

    // logic 
    try{
        // check product is in cart collection
        const product = await carts.findOne({id})

        if(product){
            // product is in cart
            // increment product quantity
            product.quantity+=1
            // update grandTotal
            product.grandTotal = product.price * product.quantity
            // to save changes in mongodb
            product.save()
            // send response to client
            res.status(200).json("Item added to your cart!!!")
        }else{
            // product is in cart
            // add product to cart
            const newProduct = new carts({
                id,title,price,image,quantity,grandTotal:price
            })
            // save new product to mongodb
            await newProduct.save()
            // send response to client
            res.status(200).json("Item added to your cart!!!")
        }
    }catch(error){
        res.status(401).json(error)
    }
}

// get cart
exports.getCart = async (req,res)=>{
    try{
        // get all items from cart collection
        const allItems = await carts.find()
        res.status(200).json(allItems)
    }catch(error){
        res.status(401).json(error)
    }
}

// remove item from cart
exports.removeFromCart = async (req,res)=>{
    // get id from req
    const {id} = req.params

    // remove id from cart collection
    try{
        const removeItem = await carts.deleteOne({id})
        if(removeItem){
            //get remaining cart item after removing a particular item
            const allItems = await carts.find()
            res.status(200).json(allItems) 
        }else{
            res.status(404).json('Item does not exists in your cart')
        }
    }catch(error){
        res.status(401).json(error)
    }
}

// emptyCart
exports.emptyCart = async (req,res)=>{
    try{
        await carts.deleteMany({})
        res.status(200).json("Your cart is emptied!!!")
    }catch(error){
        res.status(401).json(error)
    }
}

// incrementQuantity
exports.incrementCount = async (req,res)=>{
    // get product id from req
    const {id} = req.params
    try{
        // check product is in cart collection
        const product = await carts.findOne({id})
        if(product){
            // update quantity, grandTotal
            product.quantity+=1
            product.grandTotal = product.price*product.quantity
            // to save changes in mongodb
            await product.save()
            // get cart collection item after updating the particular item count
            const allItems = await carts.find()
            res.status(200).json(allItems)
        }else{
            res.status(404).json("Product is not in your cart...")
        }
    }catch(error){
        res.status(401).json(error)
    }
}

// decrementQuantity
exports.decrementCount = async (req,res)=>{
    // get product id from req
    const {id} = req.params
    try{
        // check product is in cart collection
        const product = await carts.findOne({id})
        if(product){
            // update quantity, grandTotal
            product.quantity-=1
            // check quantity = 0
            if(product.quantity==0){
                // remove product from cart collection
                await carts.deleteOne({id})
                // get all cart collection item after update the particular item count
                const allItems = await carts.find()
                res.status(200).json(allItems)
            }else{
                product.grandTotal = product.price*product.quantity
                // to save changes in mongodb
                await product.save()
                // get cart collection item after updating the particular item count
                const allItems = await carts.find()
                res.status(200).json(allItems)
            }
            
        }else{
            res.status(404).json("Product is not in your cart...")
        }
    }catch(error){
        res.status(401).json(error)
    }
}