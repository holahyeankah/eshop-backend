const db= require('../database/models');
const{Customer,Shipping, ShippingRegion }= db;


class ProfileController{
    static updateProfile(req, res, next){
        const{address_1, address_2, city, region, postal_code, country, day_phone, eve_phone, mob_phone, shippingRegionId}=req.body;
        Customer.findByPk(req.decoded.payrol.id)
        .then(customer=>{
            if(!customer){
                return res.status(404).json({message:'customer with this id doesnt exist'})
            }
            if(customer.customer_id !== req.decoded.customerId){
                return res.status(404).json({message:'you cant edit customer id'})
            }
            customer.update({
                address_1:address_1 || customer.address_1,
                address_2:address_2|| customer.address_2,
                city:city||customer.city,
                region: region || customer.region,
                postal_code: postal_code || customer.postal_code,
                country: country || customer.country,
                day_phone: day_phone || customer.day_phone,
                eve_phone: eve_phone || customer.eve_phone,
                mob_phone:customer.mob_phone || mob_phone,
                shipping_region_id: shippingRegionId || customer.shipping_region_id

            });
            return res.status(200).json({
                profile:{
                    name:customer.name,
                    email:customer.email
                },
                message:'profile successfully updated'
            })

        }).catch(next)
    }
    
 static getUserProfile(req, res, next){
     Customer.findByPk(req.decoded.customerId,{
         attributes:{
             exclude:['password', 'credit_card']
         },
         include:[{
             model:ShippingRegion,
             attributes:{
                 exclude:['shipping_region_id']
             },
             include:[{
                 model:Shipping
             }]
         }]
     }).then(user=>{
         res.status(200).json({user})
     }).catch(next)
 }
}
module.exports= ProfileController