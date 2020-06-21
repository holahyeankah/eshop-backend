const db = require('../database/models');
const { Category, Product } = db;

const getAllCategory= (req,res)=>{
Category.findAll({
    include:Product

})
.then(category=>{
    res.json(category)
})
.catch(err=>{
    res.status(404).json('unable to get category')

});
};

const getOneCategory=(req,res)=>{

    Category.findOne({
    
        where:{category_id: req.params.id},
    }
    
    ).then(category=>{
    
        res.json(category)
    }). catch(err=>{
        res.status(404).json('unable to get category');
    })
    
}
    
    
    module.exports = { getAllCategory, getOneCategory }


