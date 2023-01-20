import User from '../models/User.js'
import {StatusCodes} from 'http-status-codes'
import {
    NotFoundError,
    BadRequestError,
} from '../errors/index.js'
// don't need the try and catch in very controller by adding a package
const register = async(req, res, next) =>{
    
    const {name, email, password } = req.body
    if(!name || !email || !password){
        throw new BadRequestError("Please provide all values")
    }
    const userAlreadyExists = await User.findOne({email})
    if(userAlreadyExists){
        throw new BadRequestError('Email already in use')
    }
    const user = await User.create({name, email, password})
    const token = user.createJWT()

    res.status(StatusCodes.CREATED).json({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        location: user.location,
    })
//    try {
//     const user = await User.create(req.body)
//     res.status(200).json({user})
//    } catch (error) {
//     // passes it to the error handler middleware
//     next(error)
//     }
}

const login = async(req, res) =>{
    res.send('login user')
}

const updateUser = async(req, res) =>{
    res.send('update user')
}

export { register, login, updateUser };

