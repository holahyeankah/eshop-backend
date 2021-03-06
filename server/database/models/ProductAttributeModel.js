module.exports =( sequelize, DataTypes)=>{
    const ProductAttribute =sequelize.define('ProductAttribute', {

        product_id:{

            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
       attribute_value_id :{
            type:DataTypes.STRING(100),
            primaryKey: true,
            allowNull:false,
            }
         }, 

            { 
            timestamps: false,
            tableName: 'product_attribute'

           });
        
           ProductAttribute.associate=(models)=>{
               ProductAttribute.belongsTo(models.Product,{
                   foreignKey:'product_id',
               });
            

                ProductAttribute.associate = (models)=>{
                   ProductAttribute.hasMany(models.AttributeValue,{
                       foreignkey:'attribute_value_id',

                   });
               };
            };
        
     
    return ProductAttribute;

};