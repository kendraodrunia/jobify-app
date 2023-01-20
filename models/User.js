import mongoose from "mongoose";
import validator from "validator";
const UserScheme = new mongoose.SchemaType({
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
        // validate:{
        //     validator:(field)=> {return 2 > 1},
        //     message:'Please provide valid email'
        // }
        unique: true
    },
    password: { 
        type: String, 
        required: [true, 'Please provide password'],
        minLength: 3,
    },
    location: { 
        type: String, 
        maxLength: 20,
        trim: true,
        default: 'my city'
    },
})
                            // will create a Users collection in mongoDB with that schema
export default mongoose.model('User', UserScheme)