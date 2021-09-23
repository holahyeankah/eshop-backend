module.exports =(sequelize, DataTypes)=>{
    const Audit=sequelize.define('Audit',{
       audit_id:{
          type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        
    
        created_on:{
            type: DataTypes.DATE,
            allowNull:false
        },

        message:DataTypes.TEXT,
        code:DataTypes.INTEGER,
               
        },
      
    {
timestamps: false,
tableName: 'audit'

    });
    Audit.associate=(models)=>{
        Audit.belongsTo(models.Order,{
            foreignKey:"order_id"
        })
    }

    return Audit;

};