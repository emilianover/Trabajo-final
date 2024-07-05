const Users = require("../models/User");
module.exports = {
   register: async (req, res) => {
    const { userName, name, lastName, password, tel, adress } = req.body;
    const rol = "user";
    

    try {
      console.log(userName, name, lastName, password, tel, adress)
      const userRegistered = await Users.create({
        userName,
        name,
        lastName,
        password,
        tel,
        adress,
        rol,
      });

      if(userRegistered) {return res
        .status(201)
        .json({ message: "User Created", data: userRegistered });} else {
          return res.status(400).json({message: "Bad request, invalid data"})
        }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: 500, message: "Internal Server error" });
    }
  },
login: async (req, res) => {
    try {
        const { userName, password } = req.body;
        const userFound = await Users.findOne({ where: { userName: userName } });
  
        if (!userFound) {
          return res
            .status(404)
            .json({ status: 404, message: "User not found" });
        }
  
      
  
        if (userFound.password === password) {
          return userFound.rol === "admin"
            ? res.json({
                data: {
                  status: 200,
                  message: "Admin logeado",
                  userData: {
                    id: userFound.id,
                    userName: userFound.userName,
                    name: userFound.name,
                    lastName: userFound.lastName,
                    password: userFound.password,
                    adress: userFound.adress,
                    tel: userFound.tel,
                    rol: userFound.rol,
                  },
                },
              })
            : res.json({
                data: {
                  status: 200,
                  message: "Usuario logeado",
                  rol: userFound.rol,
                  userData: {
                    id: userFound.id,
                    userName: userFound.userName,
                    name: userFound.name,
                    lastName: userFound.lastName,
                    password: userFound.password,
                    adress: userFound.adress,
                    tel: userFound.tel,
                    rol: userFound.rol,
                  },
                },
              });
        } else {
          return res
            .status(401)
            .json({ status: 401, message: "Credenciales incorrectas" });
        }
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ status: 500, message: "Error interno del servidor" });
      }
    },
  };