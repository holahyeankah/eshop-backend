module.exports =(sequelize, DataTypes)=>{

    const Shipping= sequelize.define(
        'Shipping', {
            Shipping_id:{
                type:DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            Shipping_type:{
                type: DataTypes.STRING(100),
                allowNull: false
                
            },

            Shipping_cost:{
                type: DataTypes.INTEGER,
                allowNull:false,
                defaultValue:0.0
            },
            
            shipping_region_id:{
                type: DataTypes.INTEGER,
                allowNull:false,
            },
        },

     {
            timestamps:false,
            tableName:'shipping',
        })
    

    Shipping.associate = (models) => {
    Shipping.belongsTo(models.ShippingRegion,{
        foreignKey: 'shipping_region_id',
    });
}


return Shipping;
};