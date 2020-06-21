const db = require('../database/models');
const { Department, Category} = db;


const getAllDepartment= (req,res) => {
    Department.findAll({
        include: Category,
    }).then(department => {
        res.json(department);


    })
    .catch
    (err=> {
        console.log(err)
        res.status(404).json('department doesnt exist')
    })
};

const getOneDepartment= (req,res) => {
    Department.findOne({
where:{Department_id: req.params.id}

    }).then(department => {
        res.json(department);


    }). catch(err=>{
        res.status(404).json('unable to get one product')
    })
}

module.exports = { getAllDepartment, getOneDepartment};