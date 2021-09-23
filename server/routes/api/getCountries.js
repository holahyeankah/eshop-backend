const express =require ("express")
const getCountries= require ("../../helper/getCountries");
const verifyToken = require("../../middlewares/Authentication")


const router =express.Router()

router.get("/countries", verifyToken, getCountries)

module.exports= router