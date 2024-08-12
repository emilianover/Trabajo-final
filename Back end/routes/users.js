var express = require('express');
var router = express.Router();
const {login, register} = require("../controllers/userControllers")
const { verifyToken, adminVerify} = require("../middlewares/verify-token")
/* GET users listing. */
router.get('/', verifyToken, adminVerify, function(req, res, next) {
  res.send('respond with a resource');
});
router.post("/login", login)
router.post('/register', register)

module.exports = router;
