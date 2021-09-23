module.exports =( sequelize, DataTypes)=>{
    const Attribute =sequelize.define('Attribute',{

        attribute_id:{
       type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            },
        name:{
            type:DataTypes.STRING(100),
            allowNull:false,
             },
       
                 },
            {
        timestamps: false,
        tableName: 'attribute'

    });
  
    return Attribute;

};