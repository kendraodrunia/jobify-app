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
        select: false 
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
    if (!this.isModified('password')) return

    const salt = await bcrypt.genSalt(10) 
    this.password = await bcrypt.hash(this.password, salt)
}) 

UserSchema.methods.createJWT = function(){
    return jwt.sign({userID: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    })
}  

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model('User', UserSchema)