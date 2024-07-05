const Product = require("../models/products");

module.exports = {
    createNewProduct: async (req, res) => {
        const {newProductTitle,
            newProductPrice,
            newProductDescription,
            newProductCategory,
            newProductImage,} = req.body;
        try {
            const newProduct = await Products.create({
                newProductTitle,
      newProductPrice,
      newProductDescription,
      newProductCategory,
      newProductImage,
            })

            if(newProduct) { return res.status(201).json({message: 'New Product added', data: newProduct})

            } else {
                return res.status(400).json({message: 'Bad request, invalid Data'})
            }
        } catch (error){
            console.error(error)
            return res.status(500).json({status: 500, message: 'Internal Server Error'})
        }
        
    },
    readAllProducts: async (req, res, next)=> { 
        try{
            const allProducts = await Products.findAll();
            req.dataToSend = allProducts
            req.statusCode = 200

            next ()
        } catch ( error) {
            console.error('Error getting products from db', error)
            throw error;
        }
    } 


}