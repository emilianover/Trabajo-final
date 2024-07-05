const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db/database");
class Ordenes extends Model {}
Orders.init(
  {
    userId: DataTypes.INTEGER,
    id:{type:DataTypes.INTEGER,primaryKey:true, autoIncrement:true},
    products:{ type: DataTypes.STRING(1000), allowNull: false }
  },
  {
    sequelize,
    modelName: "orders",
    timestamps: false,
  }
);
module.exports = Ordenes;