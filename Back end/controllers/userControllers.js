const Users = require("../models/User");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const secretKey = process.env.SECRET_KEY
console.log(secretKey)

const saltRounds = 10;

module.exports = {
  register: async (req, res) => {
    const { email, name, lastName, password, tel, adress } = req.body;
    const rol = "user";

    try {
      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      const userRegistered = await Users.create({
        email,
        name,
        lastName,
        password: hashedPassword,
        tel,
        adress,
        rol,
      });

      if (userRegistered) {
        return res.status(201).json({ message: "User Created", data: userRegistered });
      } else {
        return res.status(400).json({ message: "Bad request, invalid data" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 500, message: "Internal Server error" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userFound = await Users.findOne({ where: { email } });

      if (!userFound) {
        return res.status(404).json({ status: 404, message: "User not found" });
      }

      // Comparar la contraseña hashada
      const isMatch = await bcrypt.compare(password, userFound.password);

      if (isMatch) {
        const token = jwt.sign(
          { email, id: userFound.id, rol: userFound.rol },
          secretKey,
          { expiresIn: "1h" }
        );

        return userFound.rol === "admin"
          ? res.json({
              data: {
                token,
                status: 200,
                message: "Admin logged in",
                userData: {
                  id: userFound.id,
                  email: userFound.email,
                  name: userFound.name,
                  lastName: userFound.lastName,
                  adress: userFound.adress,
                  tel: userFound.tel,
                  rol: userFound.rol,
                },
              },
            })
          : res.json({
              data: {
                token,
                status: 200,
                message: "User logged in",
                rol: userFound.rol,
                userData: {
                  id: userFound.id,
                  email: userFound.email,
                  name: userFound.name,
                  lastName: userFound.lastName,
                  adress: userFound.adress,
                  tel: userFound.tel,
                  rol: userFound.rol,
                },
              },
            });
      } else {
        return res.status(401).json({ status: 401, message: "Incorrect credentials" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 500, message: "Internal Server error" });
    }
  },
};