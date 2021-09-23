module.exports =( sequelize, DataTypes)=>{
    const Category =sequelize.define('Category', {

        category_id:{

            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        department_id:{
            type: DataTypes.STRING(100),
            allowNull:false,
        }, 
        description:{
            type:DataTypes.STRING,
            
             },
        
          },
         {
            timestamps: false,
            tableName: 'category'

           });
           Category.associate=(models)=>{
               Category.belongsToMany(models.Product, {
                    through: 'ProductCategory',
                   foreignKey: 'category_id',
        })
        Category.belongsTo(models.Department, {
            foreignKey: 'department_id'
        })
           }
  
     
    return Category;

};