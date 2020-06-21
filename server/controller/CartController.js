const db = require('../database/models');
const { ShoppingCart, Product,AttributeValue} = db;
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const getAllCartItems=(req,res)=>{
 ShoppingCart.findAndCountAll({
        include:[{
            model: Product,
                
        attributes:{
            exclude:['createdAt', 'updatedAt']
        },
        
        }],
        where:{
            cart_id: req.decoded.payrol.id
        }
    })
    .then(item=>{
        console.log(item)

        if(!item){
 return res.status(404).json({
                message: "No item in cart",
                total:0
            })
        }
      
        const totalArray=[];
        const quantityArray=[];
        const discountArray=[];

        item.rows.map(prod=>{
         
            const price= parseFloat(prod.quantity * prod.Product.price);
            const discount= parseFloat(prod.Product.discounted_price);
            totalArray.push(price);
            discountArray.push(discount);
            quantityArray.push(prod.quantity);
            // return null;
        });

        if(quantityArray.length >0){
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
               
    }
 
})
    
}



//  const attributeString= attributeArray.toString();
const addToCartItem=(req,res)=>{

    const {quantity, attributes, product_id}= req.body;
    // const {attributes}= req.body;

    // console.log(req.body)
    // attributeArray=[];
    //  attributes.forEach(value=>AttributeValue.findOne({
    //      where:{

    //         value:{
    //             [Op.eq]:value
    //         }
    //      }
    //  }
    //   )).then(attributeValue=>{
    //       if(!attributeValue){
    //           return res.status(400).json({
    //               message:"Attribute value does not exist"
    //           })
    //       }
    //       attibuteArray.push(AttributeValue.dataValue.value)
    //   })

    //   Product.findOne({
    //       attributes:{
    //         exclude:['createdAt', 'updatedAt' ]
    //       },
    //       where:{
    //         product_id:product_id

    //       }
       
              
          
    //   }).then(product=>{
    //       if(!product){
    //           res.status(400).json({
    //               message:'product not found'

    //           })
    //       }
          
    //   })
    //   const attributeString= attributeArray.toString()

    ShoppingCart.create({
        // product:req.body.data.product,
        product_id: product_id,
        cart_id:req.decoded.payrol.id,
        attributes: attributes,
        quantity:quantity

    }).then(addedProduct=>{
        console.log(addedProduct)
       return res.status(200).json({
        
           addedProduct,
           total:quantity,
           message:"cart successfully added"
       })
    })


}

const updateCart=(req, res)=>{
    console.log(req.body)
    const{quantity}=req.body;
    // ShoppingCart.update(
    //     {quantity:req.body.quantity},
    //     {returning:true, where:{item_id:req.params.id}})

    //     .then(updatedQuantity=>{
           
    //         res.status(200).json({updatedQuantity, total: quantity})
    //     })
        
            
        
        
         

        
       

    // const {addedProduct_id}= req.pa  // .catch(error=>
        //     res.status(400).json('error')rams
//     const {quantity}= req.body

    ShoppingCart.findOne({
        where:{
            item_id:req.params.id
            // item_id: addedProduct_id
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
    console.log(item)

    return res.status(200).json({
        updatedItem:{
            item,
            message:'updated successfully'
        },
        total: item.quantity
    })
    
        })
})
    



// ShoppingCart.update(req.body,{
//     where:{
//         item_id:req.params.item_id
//     }
// }).then(item=>{
//     console.log(item)
   

//     res.json({
//         item,
//         quantity
//     })
//      console.log(quantity)

// }).catch(error=>{
//     res.status(404).json('cant update')
// })

}


const deleteCart=(req, res)=>{

    // const {cart_id}= req.params;
   
    ShoppingCart.findOne({
        where:{
            cart_id:req.decoded.payrol.id,
         
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
    })

}

module.exports= {updateCart, deleteCart, addToCartItem, getAllCartItems}