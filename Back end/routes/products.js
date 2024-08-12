var express = require('express');
var router = express.Router();
const axios = require('axios');
const peek = require('../utils/peek');
const {readAllProducts, } = require('../middlewares/productsMiddleware');
const { getProductsController, updateProduct, createNewProduct, deleteProducts } = require('../controllers/productsControllers');
const { token } = require('morgan');
const { verifyToken, adminVerify} = require("../middlewares/verify-token")


// const {  deleteProducts, } = require('../controllers/deleteProducts')

router.get('/',  function(req, res , next) { 
    axios.get('https://fakestoreapi.com/products')
        .then(response => {
            console.log(response)
            res.header("Access-Control-Allow-Origin", "*");
            res.json(response.data);

        })
        .catch(error => {
            console.log(error)
            res.status(404).send(error)
        })
        
        
})

router.get('/', readAllProducts, getProductsController );

router.put('/', updateProduct, verifyToken, adminVerify )

router.post('/', createNewProduct, verifyToken, adminVerify)

router.delete('/',  deleteProducts, verifyToken, adminVerify)


module.exports = router;