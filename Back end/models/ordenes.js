const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db/database");
class Ordenes extends Model {}
Ordenes.init(
  {
    id_user: DataTypes.INTEGER,
    productos: DataTypes.STRING,
    
  },
  {
    sequelize,
    modelName: "ordenes",
    timestamps: false, // Deshabilita las marcas de tiempo
  }
);
module.exports = Ordenes;