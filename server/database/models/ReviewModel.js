module.exports =(sequelize, DataTypes)=>{
    const Review=sequelize.define('Review',{
       review_id:{
          type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        customer_id:{
            type:DataTypes.INTEGER,
              allowNull:false
          },
          product_id:{
            type:DataTypes.INTEGER,
              allowNull:false
          },
        review:{
            type:DataTypes.TEXT,
            
        },
        rating:{
            type: DataTypes.SMALLINT,
        },
    
        created_on:{
            type: DataTypes.DATE,
            
        },
    },
    {
timestamps: false,
tableName: 'review'

    });
    Review.associate=(models)=>{
        Review.belongsTo(models.Customer,{
            foreignKey:"customer_id"
        })
    },
    Review.associate=(models)=>{
        Review.belongsTo(models.Product,{
            foreignKey:"product_id"
        })
    }

    return Review;

};