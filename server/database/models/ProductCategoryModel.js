module.exports =( sequelize, DataTypes)=>{
    const ProductCategory=sequelize.define('ProductCategory', {

        product_id:{

            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
       category_id :{
            type:DataTypes.INTEGER,
            allowNull:false,
            }
         }, 

            { 
            timestamps: false,
            tableName: 'product_category'

           });
        
           ProductCategory.associate=(models)=>{
               ProductCategory.belongsTo(models.Category,{
                   foreignKey:'category_id',
               });
            

                ProductCategory.associate = (models)=>{
                   ProductCategory.belongsTo(models.Product,{
                       foreignkey:'product_id',

                   });
               };
            };
        
     
    return ProductCategory;

};