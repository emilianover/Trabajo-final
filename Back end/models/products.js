const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db/createDataBaseIfNotExist");

class Products extends Model {}

Products.init(
  {
    title: {type: DataTypes.STRING, unique: true},
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.STRING(1000), allowNull: false },
    category: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: { type: DataTypes.STRING(1000), allowNull: false },
  },
  {
    sequelize,
    modelName: "products",
    timestamps: false,
  }
);
module.exports = Products;