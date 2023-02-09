
import { UnAuthenticatedError } from '../errors/index.js';
import jwt from 'jsonwebtoken';


const authenticateUser = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnAuthenticatedError('Authentication invalid');
  }
  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload)
    // attach the user request object
    // req.user = payload
    req.user = { userID: payload.userID };
    next();// pass it on to the next middleware, aka in this example the controller in the route
  } catch (error) {
    throw new UnAuthenticatedError('Authentication invalid');
  }
};

export default authenticateUser; 
