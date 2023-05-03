// to define routes for client request, create routes folder and router.js file

// import express
const express = require('express')

// import productController
const productController = require('../controllers/productController') 

// import wishlistController
const wishlistController = require('../controllers/wishlistController')

// import cartController
const cartController = require('../controllers/cartController')

// using express create object for router class in order to setup path
const router = new express.Router()

// resolve client request in various server request

// api
// get-all products
router.get('/products/all-products', productController.getAllProducts)

// view-product/id
router.get('/products/view-product/:id',productController.viewProduct)

// add to wishlist
router.post('/wishlist/add-product', wishlistController.addToWishlist)

// get wishlist items
router.get('/wishlist/get-items',wishlistController.getWishlistItems)

// remove wishlist item
router.delete('/wishlist/remove-item/:id',wishlistController.removeFromWishlist)

// add to cart
router.post('/cart/add-product',cartController.addToCart)

// get-cart
router.get('/cart/all-products',cartController.getCart)

// remove wishlist item
router.delete('/cart/remove-item/:id',cartController.removeFromCart)

// emptyCart
router.delete('/cart/remove-all-items',cartController.emptyCart)

// incrementCartItemCount
router.get('/cart/increment-item/:id',cartController.incrementCount)

// decrementCartItemCount
router.get('/cart/decrement-item/:id',cartController.decrementCount)

// export router
module.exports = router 