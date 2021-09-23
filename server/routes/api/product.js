const express =require ("express")
const ProductController = require ("../../controller/ProductController");
const QueryValidation = require ("../../middlewares/Validations/QueryValidation")

const router =express.Router()
router.get("/product", QueryValidation.queryValidation, ProductController.getAllProducts)
router.get("/product/:product_id", ProductController.getAllProducts)
router.get("/department", ProductController.getAllDepartment)
router.get("/feature", ProductController.getFeaturedProduct)

module.exports= router