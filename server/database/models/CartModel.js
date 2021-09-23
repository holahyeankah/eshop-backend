module.exports =( sequelize, DataTypes)=>{
    const ShoppingCart=sequelize.define('ShoppingCart',{

        item_id:{

            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            
        },

        cart_id:{
         type: DataTypes.INTEGER,
        defaultValue:0
            
        },
        product_id:{

            type:DataTypes.INTEGER,
            defaultValue:0
        
        },
        attributes:{
            type:DataTypes.STRING(100),
            defaultValue:0
        },
       quantity:{
           type:DataTypes.INTEGER(100),
           defaultValue:0
       },
       buy_now:{
           type:DataTypes.BOOLEAN,
           defaultValue:0
       },
       added_on:
       {type:DataTypes.DATE,
      defaultValue:0
},
    },
        {
            timestamps: false,
            tableName: 'shopping_cart'

    });

    ShoppingCart.associate=(models)=>{
 ShoppingCart.belongsTo( models.Product,{
     foreignKey:'product_id'
 })
 

    }


    return ShoppingCart;
}

