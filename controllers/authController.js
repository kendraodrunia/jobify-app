import User from '../models/User.js'
import {StatusCodes} from 'http-status-codes'
import {
    NotFoundError,
    BadRequestError,
    UnAuthenticatedError
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
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token: token,
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
    
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide all values');
  }
  // we have select: false in the schema. we have to override it by adding the select
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }
  const token = user.createJWT();
  user.password = undefined; // make the user password undefined or only return what is needed
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
}

const updateUser = async(req, res) =>{
    res.send('update user')
}

export { register, login, updateUser };

