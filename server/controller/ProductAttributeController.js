
const db = require('../database/models');
const {ProductAttribute} = db;


const getAllProductAttribute= (req, res) => {
    ProductAttribute.findAll().
    then(product_attribute=> {
        console.log(product_attribute)
    res.json(product_attribute);


    })
    .catch
    (err=> {

        res.status(404).json('No attribute value for product')
    })
};



module.exports = { getAllProductAttribute};