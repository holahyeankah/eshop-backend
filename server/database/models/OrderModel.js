module.exports =(sequelize, DataTypes)=>{

    const Order= sequelize.define('Order', {
            order_id:{
                type:DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            total_amount:{
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue:0.00
                
            },

            shipped_on: DataTypes.DATE,

            created_0n:{
                type:DataTypes.DATE,
                allowNull:false,
                defaultValue:Date.now()
               
            },
            
            status:{
                type: DataTypes.INTEGER,
                allowNull:false,
                defaultValue:0.00
            },
            comments:DataTypes.STRING(255),
            customer_id:DataTypes.INTEGER,
            auth_code:DataTypes.STRING(50),
            references:DataTypes.STRING(50),
            shipping_id:DataTypes.INTEGER,
            tax_id:DataTypes.INTEGER
            
        },

     {
            timestamps:false,
            tableName:'orders',
        })
    

    Order.associate = (models) => {
    Order.belongsTo(models.Customer,{
        foreignKey: 'customer_id',
    })
};
    Order.associate = (models) => {
        Order.belongsTo(models.Shipping,{
            foreignKey: 'shipping_id',
        });
        Order.associate = (models) => {
            Order.belongsTo(models.Tax,{
                foreignKey: 'tax_id',
            });
        }
}


return Order;
};