const express =require("express")

const GetCountries= require("./getCountries")
const Checkout= require("./checkout")
const Product= require("./product")
const Auth= require("./auth")
const ShoppingCart= require("./shoppingCart")

const router= express.Router()

router.use("/", Checkout)
router.use("/", Product)
router.use("/", Auth)
router.use("/", ShoppingCart)
router.use("/", GetCountries)


module.exports= router