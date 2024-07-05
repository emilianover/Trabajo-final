const postOrderController = async (req, res) => {
    return res.status(req.statusCode).json(req.dataToSend)
}

module.exports = postOrderController