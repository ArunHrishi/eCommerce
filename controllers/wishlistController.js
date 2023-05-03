const wishlists = require('../models/wishlistSchema')

// add to wishlist
exports.addToWishlist = async (req,res)=>{

    // get product details from request
    // using destructuring
    const {id,title,price,image} = req.body

    // logic
    try{
        // check weather product is in wishlist
        const item = await wishlists.findOne({id})
        if(item){
            res.status(402).json("Item already exists in your wishlist!!!")
        }else{
            // add item in wishlist
            const newProduct = new wishlists({
                id,title,price,image
            })
            // to store
            await newProduct.save()
            res.status(200).json("Item added to your wishlist 0_0")
        } 
    }catch(err){
        res.status(401).json(err)
    }
}

// get wishlist
exports.getWishlistItems = async (req,res)=>{
    // logic
    try{
        // get all products from wishlists collection in mongodb
        const allProducts = await wishlists.find()
        res.status(200).json(allProducts)
        }catch(error){
            res.status(401).json(error)
        }
}

// remove item from wishlist
exports.removeFromWishlist = async (req,res)=>{
    // get id from req
    const {id} = req.params

    // remove id from wishlist collection
    try{
        const removeItem = await wishlists.deleteOne({id})
        if(removeItem){
            //get remaining wishlist item after removing a particular item
            const allItems = await wishlists.find()
            res.status(200).json(allItems) 
        }else{
            res.status(404).json('Item does not exists in your wishlist')
        }
    }catch(error){
        res.status(401).json(error)
    }
}