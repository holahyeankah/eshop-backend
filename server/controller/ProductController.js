const db = require('../database/models');
const { Op } = require('sequelize');
const { Product, AttributeValue, Category, Department } = db;


const getAllProduct= (req,res) => {
    const { page, limit, searchTerm, department, category } = req.query;
    const offset = parseInt((page -1), 10) * limit;
    const queryBuilder = {
        distinct: true,
        include: [{
            model: AttributeValue,
            // attribute:[{model: AttributeValue}]
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
                        [Op.like]: `%${req.query.department}%`
                    }
                }
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
        res.json({
            paginationMeta: {
                currentPage,
                pageSize,
                totalPages,
                totalItems: product.count
            },
            products: product.rows
        })
    }).catch
    (err=> {
        console.log(err)
        res.status(404).json('unable to get product')
    })
}

const getOneProduct=(req,res)=>{

Product.findOne({
    include: {
        model: AttributeValue,
        attribute:[{model: AttributeValue}]
    },

    where:{product_id: req.params.id},
}

).then(product=>{

    res.json(product)
}). catch(err=>{
    res.status(404).json('unable to get one product');
})

}


module.exports = { getAllProduct, getOneProduct }
