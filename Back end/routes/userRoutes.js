const express = require('express');
const router = express.Router();
const Users = require("../models/User")

const { register, login } = require('../controllers/userControllers');

//const userM = new UsersModel()

router.post('/register', register);
router.post('/login', login);
router.get("/:id", async (req, res)=>{
    const userid = req.params.id
    const usuarioEncontrado = await Users.findByPk(userid)
    res.send(usuarioEncontrado)
})

module.exports = router;

//Users.findByPk(userid).then((user)=>{

//})

