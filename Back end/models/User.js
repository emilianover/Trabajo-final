const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db/createDataBaseIfNotExist");
class Users extends Model {}
Users.init(
  {
    
    email: {
      type: DataTypes.STRING,
      unique:true
     },
    password: DataTypes.STRING,
    rol: DataTypes.STRING,
    celular: DataTypes.STRING,
    domicilio: DataTypes.STRING
  },
  {
    sequelize,
    modelName: "Users",
    timestamps: false, // Deshabilita las marcas de tiempo
  }
);
module.exports = Users;