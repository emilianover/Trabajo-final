const Ordenes = require("../models/ordenes")


module.exports = {
    readOrders: async (req, res, next)=> { 
        try{
            const allOrders = await Orders.findAll();
            req.dataToSend = allOrders
            req.statusCode = 200
    
            next ()
        } catch ( error) {
            console.error('Error getting Orders from db', error)
            throw error;
        }
    }
}
 