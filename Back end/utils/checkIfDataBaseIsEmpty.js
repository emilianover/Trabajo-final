const User = require("../models/User")
const Products = require("../models/products")

async function checkIfDatabaseIsEmpty () {
    try {
        const usersCount = await Users.count();
        const productsCount = await Products.count();

        if (usersCount === 0 && productsCount === 0 ) {
            return true //Si da 0 es porque la base de Datos esta vacía
        } else {
            return false
        }
    } catch (error) {
        console.error("Error al intentar verificar si la base de datos está vacía", error)
    }
}

module.exports = checkIfDatabaseIsEmpty;