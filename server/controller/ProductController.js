const db = require('../database/models');
const { Op } = require('sequelize');
const { Product, AttributeValue, Category, Department } = db;


class ProductController {

 static getAllProducts(req, res, next){
 const { page, limit, searchTerm, department, category } = req.query;
 const offset = parseInt((page -1), 10) * limit;
 const queryBuilder = {
        distinct: true,
    include: [{
            model: AttributeValue,
        }],
    offset: parseFloat(offset),
     limit: parseFloat(limit)
    }

    if (searchTerm) {
        queryBuilder.where = {
            [Op.or]: [
                {
                name: {
                    [Op.like]: `%${searchTerm}%`
                }
            }, {
                description: {
                    [Op.like]: `%${searchTerm}%`
                }
             }
        ]
        }
    }
   
    if (department) {
        queryBuilder.include[1] = {
            model: Category,
            include: [{
                model: Department,
                where: {
                    name: {
                        [Op.like]: `%${department}%`
                    }
                }
            }]
        }
    }
    if(department && category){
        queryBuilder.include[1]={
            model:Category,
            require:true,
            where:{
                name:{
                    [Op.like]: `%${category}%`
                }

            },
            include:[{
                model:Department

            }]
            
        }
    }

       Product.findAndCountAll(queryBuilder)
     .then(product => {
         if (product.rows.length < 1) {
             return res.json({
                 message: "Product not found for this page"
             })
         }
         const currentPage = page;
         const pageSize = limit;
         const totalPages = Math.ceil(product.count/pageSize)
         console.log(product.count)
        res.json({
            paginationMeta: {
                currentPage,
                pageSize,
                totalPages,
                totalItems: product.count
            },
            products: product.rows
        })
    })
    .catch(next)  
  
}



static getOneProduct(req,res, next){
    const {product_id}=req.params;

Product.findByPk(product_id,{
    include: {
        model: AttributeValue,
        attribute:[{model: AttributeValue}]
    },
}

).then(product=>{
    if(!product){
        res.status(404).json({message:"Item not found"})
    }

    res.status(200).json(product)
}).catch(next)

}

static getAllDepartment(req,res, next) {
    Department.findAll({
        attributes:['department_id', 'name', 'description'],
     include: [{
    model:Category,
      attributes:['category_id', 'name', 'description'],
      include:[{
      model:Product,
                attributes:['product_id', 'name', 'image', 'price', 'discounted_price']
     }]
        }]
    }).then(department => {
        if(!department){
            res.status(404).json({message: "Admin has not create any department"})
        }

        res.status(200).json({message:"department gotten successfullly" ,department});
 })
    .catch(next)
}


static getFeaturedProduct (req, res, next){
    Product.findAll({
        attributes:["productId","name", "description", "price", "discounted_price", "image"],
        order:[
         [Sequelize.literal('RAND()')],
    ],
    limit:6
    })
    .then(featuredItem=>{
        if(!featuredItem){
            res.status(404).json({message:"No featured products"})
        }
        res.status(200).json({featuredItem})
    })

}

}

module.exports= ProductController
