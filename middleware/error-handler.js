import {StatusCodes} from 'http-status-codes'

const errorHandlerMiddleware = (error, req, res, next)=>{
    console.log(error.message)

    const defaultError = {
        statusCode: error.statusCode ||StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || "something went wrong, try again later"
    }
    if(error.name === 'ValidationError'){
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.message = Object.values(error.errors).map(item => item.message).join(", ")
    }
    if(error.code && error.code === 11000){
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.message = `${Object.keys(error.keyValue)} fields need to be unique`
    }

    res.status(defaultError.statusCode).json({message: defaultError.message, statusCode: defaultError.statusCode})
}

export default errorHandlerMiddleware