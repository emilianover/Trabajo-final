const express = require('express');
const router = express.Router();
const Users = require("../models/User")
const {verifyToken, adminVerify} = require("../middlewares/verify-token")

const { register, login } = require('../controllers/userControllers');

//const userM = new UsersModel()

router.post('/register', register, verifyToken, adminVerify);
router.post('/login', login);
router.get("/:id", verifyToken, adminVerify, async (req, res)=>{
    const userid = req.params.id
    const usuarioEncontrado = await Users.findByPk(userid)
    res.send(usuarioEncontrado)
})

module.exports = router;
