const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ecommercefinal", "root", "1q2w3e4r", {
    host: "127.0.0.1",
    dialect: "mysql",
  });
async function createDatabaseIfNotExists() {
    try {
      // Intenta crear la base de datos si no existe
      console.log("hola")
      await sequelize.sync();
      console.log('Base de datos creada correctamente');
    } catch (error) {
      console.error('Error al crear base de datos', error);
    }
  }

  module.exports = {createDatabaseIfNotExists, sequelize } ;