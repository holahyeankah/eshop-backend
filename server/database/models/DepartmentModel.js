module.exports =( sequelize, DataTypes)=>{
    const Department=sequelize.define('Department', {

        department_id:{

            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        description:{
            type: DataTypes.STRING(1000),
            allowNull:false,
        } 
       
        },
    
    {
        timestamps: false,
        tableName: 'department',

    });
  
  
    return Department;

};