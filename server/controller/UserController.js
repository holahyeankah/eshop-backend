const db = require('../database/models');
const jwt= require('jsonwebtoken');

const { Customer } = db;
 

// exports.allUsers=(req, res)=>{

//     jwt.verify(req.token, 'secretKey', (err, authData)=>{
//         if(err){
//             res.status(404).json('unverified')
//         } else{
//             res.json({message:'customer gotten.....',
//         authData
//     })
//         }
//     })

// }


exports.allUsers=(req,res)=>{
  Customer.findOne({
    where:{
      customer_id:req.decoded.payrol.id
    }
  }).then(customer=>{
    if(!customer){
      return res.status(404).json({message:"no customer"})
    }else {
       const data =  {
           id:customer.customer_id,
           name:customer.name,
           email:customer.email

       }
      res.status(200).json({
          data,
        message:  'user content'})

    }
    
})

  }

// exports.allUsers= verifyToken, (req, res)=>{

//     jwt.verify(req.token, 'secretKey', (err, authData)=>{
//         if(err){
//             res.status(404).json('unverified')
//         } else{
//             res.json({message:'customer gotten.....',
//         authData
//     })
//         }
//     })

// })