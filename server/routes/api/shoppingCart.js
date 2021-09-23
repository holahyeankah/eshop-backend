const express =require ("express")
const CartController = require ("../../controller/CartController");
const ShoppingCartValidation = require ("../../middlewares/Validations/ShoppingCartValidation")
const verifyToken = require ("../../middlewares/Authentication")

const router =express.Router()

router.post("/cart", ShoppingCartValidation.checkCartItem,
ShoppingCartValidation.validateCartInput, CartController.addToCartItem)

router.get("/cart", verifyToken, CartController.getAllCartItems)

router.put("/cart/:cart_id",verifyToken,
ShoppingCartValidation.validateCartUpdate,
 CartController.updateCart)

router.delete("/cart/:cart_id",verifyToken, CartController. deleteCart)

module.exports =router
