const db = require('../database/models');
const { Customer} = db;
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');

// credit_card,
//     address_1, address_2,city,region,postal_code, country
const createCustomer=(req,res)=>{
const {name, email,password} = req.body;
console.log(name, email,password,)
const saltRounds=10;
const hash=bcrypt.hashSync(password, saltRounds)
console.log(hash)
Customer.create({
    name: name,
    email: email,
    password:hash
}).then(customer=>{
    res.json(customer)
        
}).catch(err=>{
    res.status(404).json('no such customer')
})

}

const getOneCustomer=(req,res)=>{
 
const {email, password}= req.body;
Customer.findOne({
    
        where:{
            email: email
       
           
        }
    })
    .then(customer=>{
        console.log(customer.name, customer.password)
     if(!customer) return res.status(404).json('customer doesnt exist')
         bcrypt.compare(password, customer.password, (err, result)=>{
             if (err){
                 throw new Error(err)
             };
             if (result){   
                 const payrol={
                    id: customer.customer_id
                    

                 }
                   
              jwt.sign({payrol},'secretKey', {expiresIn: '1d'}, (err, token)=>{
                        res.json({
                            message:"login succesfully",
                          token
                        
                      })
        
                 
         })
        } else{
            res.status(404).json('invalid credential')
        }
    
         })
    })
   
}
const updateCustomer=(req, res)=>{

    

    Customer.update(req.body,{
        where:{
            customer_id:req.decoded.payrol.id
        }
    

    }).then(num=>{
        console.log(num)
        if(num){
            return res.status(200).json({
                message:`Customer updated successfully `
            })
        }else{
            return res.status(400).json({message:"cant update profile"})
        }

    })

}



function verifyToken(req, res, next){
    const bearerHeader= req.headers['authorization'];
    if(typeof bearerHeader !=='undefined'){

        const bearer= bearerHeader.split(' ');
    
      
        const bearerToken=bearer[1];
        jwt.verify(bearerToken, 'secretKey', (err, token) => {
            if (err) {
               return res.status(401).json({ message: 'unverified token'})
            } else {
                req.decoded = token;
                return next();
            }
        })

    } else{
       
        return res.status(404).json('unverified')
    }
}

// const verifyToken=(req, res)=>{
//     const token = req.Headers['Authorization'];
//     if(!token){
//         return res.status(404).json("No token provided")
//     }
//     jwt.verify(token, 'secretKey', (err, decoded)=>{
//         if(err){
//             return res.status(404).json("Unauthorized")
//         }else{

//             return req.token= decoded.id
        


//         }
        
//     })
   
// }

    


module.exports = {createCustomer, getOneCustomer, verifyToken, updateCustomer}


