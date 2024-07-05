function userMiddleware (req,res,next){
    const { userName, name, lastName, password, tel, adress } = req.body;

  



    if (!userName || !name || !lastName || !password || !tel || !adress) {
    return res.status(400).json({ message: "Please complete all required fields" });
    } else {
      next()
    }
      }
    
      module.exports = userMiddleware