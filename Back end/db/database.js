const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ecommercefinal", "root", "1q2w3e4r", {
  host: "127.0.0.1",
  dialect: "mysql",
});


const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log("Base de datos y tablas creadas o sincronizadas correctamente");
  } catch (error) {
    console.error("Error al sincronizar la base de datos: ", error);
  }
};

module.exports = { sequelize };
