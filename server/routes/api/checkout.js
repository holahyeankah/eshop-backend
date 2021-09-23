const express =require ("express")
const CheckoutController = require ("../../controller/CheckoutController");
const verifyToken = require("../../middlewares/Authentication")


const router =express.Router()

router.post("/checkout", verifyToken, CheckoutController.checkout)
router.get("/region", CheckoutController.getShippingRegion)

module.exports= router