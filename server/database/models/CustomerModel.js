module.exports =(sequelize, DataTypes)=>{
    const Customer=sequelize.define('Customer',{
       customer_id:{
          type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        email:{
            type: DataTypes.STRING(100),
            allowNull:false,
          unique: true,
        validate:{
        isEmail:{msg:'enter a valid Email'}
       
        },
    },
    
        password:{
            type: DataTypes.STRING(100),
            allowNull:false
        },

        credit_card:DataTypes.TEXT,
        address_1:DataTypes.STRING(100),
        address_2:DataTypes.STRING(150),
        city: DataTypes.STRING(100),
        region: DataTypes.STRING(100),
        postal_code:DataTypes.STRING(100),
        country:DataTypes.STRING(100),
        shipping_region_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue:1
        },
        day_phone:DataTypes.STRING(100),
        eve_phone:DataTypes.STRING(100),
        mob_phone:DataTypes.STRING(100),
    },
    {
timestamps: false,
tableName: 'customer'

    });
    Customer.associate=(models)=>{
        Customer.belongsTo(models.ShippingRegion,{
            foreignKey:"shipping_region_id"
        })
    }

    return Customer;

};