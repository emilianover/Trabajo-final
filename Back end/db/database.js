const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ecommercefinal", "root", "1q2w3e4r", {
  host: "127.0.0.1",
  dialect: "mysql",
});

module.exports = { sequelize };
