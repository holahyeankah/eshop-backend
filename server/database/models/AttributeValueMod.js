module.exports =( sequelize, DataTypes)=>{
    const AttributeValue =sequelize.define('AttributeValue',{
     attribute_value_id:{
        type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            },
        attribute_id:{
            type:DataTypes.INTEGER(100),
            allowNull:false,
             },

             value:{
                 type: DataTypes.STRING(100),
                 allowNull:false
             },
       
                 },
            {
        timestamps: false,
        tableName: 'attribute_value'

    });

    AttributeValue.associate=(models)=>{
        AttributeValue.belongsTo(models.Attribute,{
            foreignKey:'attribute_id',
        });
    };
        AttributeValue.associate=(models)=>{
            AttributeValue.belongsToMany(models.Product, {
                through:'ProductAttribute',
                foreignKey:'attribute_value_id',
            });
        };
    
   
     
    return AttributeValue;

};