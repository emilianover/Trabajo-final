//DANGER
const Products = require("../models/products");
const Users = require("../models/users");
const Orders = require("../models/orders");
const readDb = require("./readDb");

async function createDb() {
  const { products, users, orders } = await readDb();

  try {
    //Productos
    const createProductPromises = products.map(async (product) => {
      const { price, category, description, title, image } = product;
      const newProduct = await Products.create({
        price,
        category,
        description,
        title,
        image,
      });
      if (newProduct) {
        console.log("Creado : ", newProduct);
      } else {
        console.log("Producto no creado");
      }
      return newProduct;
    });
    const createdProductsResult = await Promise.all(createProductPromises);

    console.log("Todos los productos creados ", createdProductsResult);

    //Usuarios

    const createUserPromises = users.map(async (user) => {
      const { name, lastName, userName, password, adress, tel, rol } = user;
      const newUser = await Users.create({
        name,
        lastName,
        userName,
        password,
        adress,
        tel,
        rol,
      });
      if (newUser) {
        console.log("Usuario creado ", newUser);
      } else {
        console.log("Usuario No creado");
      }
      return newUser;
    });
    const createUsersResult = await Promise.all(createUserPromises);
    console.log("Todos los usuarios creados, ", createUsersResult);

    //Ordenes

    const createOrdersPromises = orders.map(async (order) => {
      const { userId, products } = order;
      const newOrder = await Orders.create({
        userId,
        products
      })
      if(newOrder) {
          console.log("Orden creada" , newOrder)
      } else {
        console.log('Orden no creada')
      }
    });
    const createOrdersResult = await Promise.all(createOrdersPromises);
    console.log("Todas las ordenes creadas, ", createOrdersResult);
  } catch (error) {
    console.error("Error General", error);
  }
}

module.exports = createDb;
