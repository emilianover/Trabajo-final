module.exports = {
    getOrdersController: async (req, res) => {
        return res.status(req.statusCode).json(req.dataToSend)
      },
}