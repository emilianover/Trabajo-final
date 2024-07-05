const Ordenes = require("../models/ordenes");

const postOrderMiddleWare = async (req, res, next) => {
    const { userId, products } = req.body;
  
    try {
      const newOrder = await Orders.create({
        userId,
        products,
      });
      req.dataToSend = {message: 'New Order Created'}
      req.statusCode = 200
      next()
    } catch (error) {
      res.status(401).json({message: 'you must log in to proceed', status: '401'});
      console.error(error);
    }
  };
  
  module.exports = postOrderMiddleWare