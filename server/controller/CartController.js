const db = require('../database/models');
const { ShoppingCart, Product,AttributeValue} = db;
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

class CartController{

static getAllCartItems(req,res, next){
 ShoppingCart.findAndCountAll({
        include:[{
            model: Product,
                
        attributes:{
            exclude:['createdAt', 'updatedAt']
        },
        
        }],
        where:{
            customer_id: req.decoded.customerId
        }
    })
    .then(item=>{
        if(!item){
 return res.status(404).json({
                message: "No item in cart",
                total:0
            })
        }    
        const totalArray=[];
        const quantityArray=[];
        const discountArray=[];

        item.rows.map(item=>{
           const price= parseFloat(item.quantity * item.Product.price);
            const discount= parseFloat(item.Product.discounted_price);
            totalArray.push(price);
            discountArray.push(discount);
            quantityArray.push(item.quantity);
    
        });

        if(quantityArray.length > 0){
         const   totalItem= quantityArray.reduce((prev, next)=> (prev + next));
          const  subTotal= totalArray.reduce((prev, next)=>(prev + next));
          const  totalDiscount=discountArray.reduce((prev, current)=>(prev + current));
          const  finalPrice= subTotal-totalDiscount;
      
         return res.status(200).json({
             item,
            totalItem,
            subTotal,
            totalDiscount,
            finalPrice
        });
        return res.status(404).json({
    message:"No item in the cart at moment",
    totalItem:0
})
               
    }
 
}).catch(next)
    
}

static addToCartItem(req,res, next){

 const {quantity, attributes, productId}= req.body;
  const attributeArray=[]
  attributes.forEach(value=>AttributeValue.findOne({
      where:{
          value:{
              [Op.like]: value
          }
      }
  }).then(featuredAttribute=>{
      if(!featuredAttribute){
          res.status(404).json({Message:"No item at the moment"})
      }
      attributeArray.push(featuredAttribute)
  }));

  Product.findOne({
      where:{
          product_id:productId
      }
  }).then(product=>{
      if(!product){
          res.status(404).json({message:"No product in the cart"})
      }
      const attributeString=attibuteArray.toString()
      ShoppingCart.create({
        product_id: productId,
        customer_id:req.decoded.customerId,
        attributes: attributeString,
        quantity:quantity

    }).then(item=>{
       return res.status(200).json({
           item,
           total:quantity,
           message:"cart successfully added"
       })
    }).catch(next)

  }).catch(next)
}
    
 

static updateCart(req, res, next){
    const {cart_id} = req.params
    const{quantity}=req.body;
   
 ShoppingCart.findOne({
        where:{
            item_id:cart_id,
            customer_id:req.decoded.customerId
          
        }

    }).then(item=>{
        if(!item){
            return res.status(404).json({
                message:"no cart item"
            })
        }
item.update({
    quantity:quantity || item.quantity
}).then((item)=>{

    return res.status(200).json({
        updatedItem:{
            item,
            message:'updated successfully'
        },
        total: item.quantity
    })
    
        })
}).catch(next)
    
}


static deleteCart(req, res, next){
    const {cart_id} =req.params
   ShoppingCart.findOne({
        where:{
            item_id:cart_id,
            customer_id: req.decoded.customerId
         
        }

    }).then(item=>{
        if(!item){
            return res.status(404).json({
                message:"no cart item"
            })
        }
item.destroy();
return res.status(200).json({
    
    message: "cart successfully remove"
})
    }).catch(next)

}
}
module.exports= CartController