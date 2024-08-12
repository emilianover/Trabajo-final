const jwt = require("jsonwebtoken")
const secretKey = process.env.SECRET_KEY


function verifyToken(req, res, next) {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not provied" });
    }
    try {
      const payload = jwt.verify(token, secretKey);
      
      req.user = payload;
      
      next();
    } catch (error) {
      return res.status(403).json({ message: "Token not valid" });
    }
  }

  function adminVerify(req, res, next){
    const user = req.user
    if(user.rol === "admin"){
     next()
    }else{
        res.status(403).send("no autorizado")
    }
}

  module.exports = {verifyToken, adminVerify}