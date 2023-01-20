import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Please provide name'],
        minLength: 3,
        maxLength: 20,
        trim: true
    },
    lastName: { 
        type: String, 
        maxLength: 20,
        trim: true,
        default: 'lastName'
    },
    email: { 
        type: String, 
        required: [true, 'Please provide email'],
        validate:{
            validator: validator.isEmail,
            message:'Please provide valid email'
        },
        unique: true
    },
    password: { 
        type: String, 
        required: [true, 'Please provide password'],
        minLength: 3,
        select: false // excludes the password when querying
     },
    location: { 
        type: String, 
        maxLength: 20,
        trim: true,
        default: 'my city'
    },
})

// encrypting password
UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10) // creating extra characters
    this.password = await bcrypt.hash(this.password, salt)
    console.log(this.password)
}) // hook that is called when we save a doc but not every method triggers it. e.g. findAndUpdate

// JWT so only the user can access their jobs
// JWT is stored in the frontend react state
// JWT is also stored in local storage. every future request would use that token to validate
UserSchema.methods.createJWT = function(){
    // jwt.sign(payload,secret,options)
    return jwt.sign({userID: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}  

// will create a Users collection in mongoDB with that schema
export default mongoose.model('User', UserSchema)