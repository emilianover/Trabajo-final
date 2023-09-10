const user = require("../models/User");
module.exports = {
  register: async (req, res) => {
    try {
        const { email, password, tel, address } = req.body;

        if(!email || !password || !tel || !address) {
            return res.status(400).json('Faltan campos requeridos');
        }

        const userRegistered = await Users.create({ email, password, tel, address });

        return res.status(201).json({ message: "Usuario creado correctamente", data: userRegistered});
    } catch (err) {
        return res.json(err);
    }
},
login: async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound = await Users.findOne({ where: { email: email }});

        return userFound === null ? res.status(404).json(false) : userFound.password === password ? res.json(true) : res.status(401).json(false);
    } catch (err) {
        return res.json(err);
    }
}
}