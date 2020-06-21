const db = require('../database/models');
const {Shipping, ShippingRegion} = db;

const getAllShipping= (req,res)=>{
Shipping.findAll({
    include: ShippingRegion

})
.then(shipping=>{
    res.json(shipping)
})
.catch(err=>{
    res.status(404).json('No shipping yet')

});
};

const getOneShipping=(req,res)=>{

    Shipping.findOne({
    
        where:{shipping_id: req.params.id},
    }
    
    ).then(shipping=>{
    
        res.json(shipping)
    }). catch(err=>{
        res.status(404).json('No shipping yet');
    })
    
}
    
    
    module.exports = { getAllShipping, getOneShipping}

