var express = require('express');
const { verifyToken, } = require('../middlewares/verify-token');
var router = express.Router();


router.post("/", verifyToken,function(req, res){

   const user = req.user
    res.send("ordenes")
})

// router.post("/add", 
// verifyToken,
// function(req, res) {

// })

module.exports=router