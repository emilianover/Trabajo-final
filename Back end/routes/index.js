const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/api', function(req, res, next) {
  res.status(200).json({
    succes:true
  });
});

const usersRoutes = require("./userRoutes");
/* Users Routes */
router.use("./users", usersRoutes);

module.exports = router;



