const stripe = require ('stripe');
const db = require('../database/models');
const Mailer =require ('../helper/Mailer');
const uuid = require("uuid")
const dotenv = require ('dotenv');
dotenv.config();
const{Customer, Product, Shipping,ShippingRegion, ShoppingCart, Order}=db;


const stripePayment=stripe(process.env.secretKey);
const idempontencyKey=uuid
class CheckoutController{
 static checkoutQuery(req, res, finalPrice, description=null, shippingId,shippingType,
    shippingCost, customerId,stripeToken,stripeEmail,next){
        stripePayment.customers.create({
            email:stripeEmail,
            source:stripeToken

        }).then(customer=>stripePayment.charges.create({
            amount:finalPrice,
            currency:'usd',
            customer:customer.id
        },{idempontencyKey})
        .then(payment=>{
            Mailer.sendOrderConfirmation(customerId, shippingCost, shippingType);
            Customer.findByPk(customerId)
            .then(user=>{
                Order.create({
                    total_amount:finalPrice/100,
                    comments:description,
                    customer_id:user.customer_id,
                    shipping_id:shippingId,
                    references:payment.balance_transaction,
                    auth_code:req.body.stripeToken || null
                })
            }).then(()=>{
                CheckoutController.clearShoppingCart(req, res,next);
                    return res.status(200).json({message:'payment successful'})
                       
                })
                .catch(next)
        })
        .catch(next)
        )
    }
    static checkout(req, res, next){
        const{shippingId, stripeToken, stripeEmail}=req.body
        Shipping.findByPk(shippingId)
        .then(shipping=>{
            if(!shipping){
                return res.status(404).json({message:'this shipping id does not valid'})
            }
      const shippingCost=parseFloat(shipping.shipping_cost);
      const shippingType=shipping.shipping_type;
      ShoppingCart.findAll({
        include:[{
         model:Product,
        attributes:{
         exclude:['createdAt', 'updatdeAt']
                    }
                }],
                where:{
                    customer_id:req.decoded.customerId
                }
            }).then(cart=>{
     const price=[];
        const discount=[];
        const {customerId}=req.decoded
        cart.map(item=>{
          const currentPrice=parseFloat(item.Product.price * item.quantity);
         const currentDiscount=parseFloat(item.discounted_price)
          price.push(currentPrice);
         discount.push(currentDiscount)

     });
    const totalPrice=price.reduce(prev, next=>prev + next)
    const totalDiscount=discount.reduce(pre, next =>pre + next);
  finalPrice=Math.round((totalPrice + shippingCost - totalDiscount)*100)
     const description='payment for your oredr on T-shirt shop';
    return CheckoutController.checkoutQuery(req, res, finalPrice,description, shippingId,
  shippingType, shippingCost, customerId, stripeToken, stripeEmail, next)


            }).catch(next)
        }).catch(next)

    }

static clearShoppingCart(req, res, next){
    ShoppingCart.destroy({
        where:{
            customer_id:req.decoded.customerId
        },
        force:true
    }).catch(next)
}


static getShippingRegion(req, res, next){
    ShippingRegion.findAndCountAll({
        include:[{
            model:Shipping
        }]

    }).then(shipping=>{
        if(shipping.rows <1){
            return res.status(404).json({message:'No shippingRegion in the database'})

        }
        return res.status(200).json(shipping);
    }).catch(next)
}
}

module.exports= CheckoutController;


