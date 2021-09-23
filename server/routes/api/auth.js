const express =require ("express")
const AuthController = require ("../../controller/AuthController");
const ProfileController = require ("../../controller/ProfileController");
const UserInputValidation = require ("../../middlewares/Validations/CustomerProfileValidation")
const verifyToken = require ("../../middlewares/Authentication")

const router =express.Router()
router.post("/create", UserInputValidation.signUpInputValidation, AuthController.createCustomer)
router.post("login", UserInputValidation.loginInputValidation, AuthController.loginCustomer)
router.get("/profile", verifyToken, ProfileController.getUserProfile)
router.put("/profile/:id", verifyToken, ProfileController.updateProfile)


module.exports=router