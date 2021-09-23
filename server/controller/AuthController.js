const db = require('../database/models');
const { Customer} = db;
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv= require ('dotenv')
dotenv.config()

const secret=process.env.SECRET_KEY

class AuthController{

static createCustomer(req,res, next){
const {fullname, password} = req.body;
let{email}=req.body;
email=email.toLowerCase()

Customer.findOne({
    where:{
        email
    }
}).then(customer=>{
    if(customer){
        return res.status(400).json({message:"Email already in use"})
    }
    const saltRounds=10;
const hash=bcrypt.hashSync(password, saltRounds)
Customer.create({
    name: fullname,
    email,
    password:hash
}).then(customer=>{
  const token=jwt.sign({customerId:customer.customer_id},secret, {expiresIn:"1d"})
  return res.Status(201).json({message:" Registration successful", user:{
      name:customer.fullname,
      email:customer.email,
      token
  }})
        
})
res.status(400).json({message:"Registartion fail"})
})
.catch(next)
}

static loginCustomer(req,re, next){
 
const {password}= req.body;
let{email}=req.body;
email=email.toLowercase();

Customer.findOne({
  where:{
     email      
        }
    })
    .then(customer=>{
     if(customer){
 if(bcrypt.compareSync(password, customer.password)){
     const token = jwt.sign({customerId:customer.customer_id}, secret, {expiresIn:"1d"})
     return res.status(201).json({message:"Congratulation, you are logged in",
     user:{
           email:customer.email,
         token
             }
            })

         }
return res.status(400).json({message:"Email or password incorrect"})
     }
     
    }).catch(next)
}
}



module.exports= AuthController


