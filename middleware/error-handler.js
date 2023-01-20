const errorHandlerMiddleware = (error, req, res, next)=>{
    console.log(error)
    res.status(500).json({msg: "there was an error"})
}

export default errorHandlerMiddleware