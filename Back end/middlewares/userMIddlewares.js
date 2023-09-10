function userMiddleware (req,res,next){
    const { body }= req
    console.log ('me hicieron click')
    console.log(req)
    console.log(body)
    res.status(200).json({ success: true})

}

module.exports = userMiddleware