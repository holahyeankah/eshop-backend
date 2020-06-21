const db = require('../database/models');
const { Attribute, AttributeValue} = db;


const getAllAttribute= (req, res) => {
    Attribute.findAll({
        include: AttributeValue
    }).
    then(attribute=> {
        console.log(attribute)
    res.json(attribute);


    })
    .catch
    (err=> {

        res.status(404).json('No attribute ')
    })
};



module.exports = { getAllAttribute};