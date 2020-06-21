
const db = require('../database/models');
const {AttributeValue} = db;


const getAllAttributeValue= (req, res) => {
    AttributeValue.findAll({
      
    }).
    then(attribute_value=> {
        console.log(attribute_value)
    res.json(attribute_value);


    })
    .catch
    (err=> {

        res.status(404).json('No attribute value for product')
    })
};



module.exports = { getAllAttributeValue};