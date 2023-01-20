import User from '../models/User.js'

const register = async(req, res) =>{
   try {
    const user = await User.create(req.body)
    res.status(201).json({user})
   } catch (error) {
    res.status(500).json({msg: "there was an error"})
   }
}

const login = async(req, res) =>{
    res.send('login user')
}

const updateUser = async(req, res) =>{
    res.send('update user')
}

export { register, login, updateUser };

