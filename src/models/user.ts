import mongoose from 'mongoose'
const Joi = require('joi')



const userSchema = new mongoose.Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    email:{type:String, required:true, unique:true},
    country: {type:String, required:true},
    language: {type:String, required:true},
    nationalty: {type:String, required:true},
    password:{type:String, required:true}
})

export const User = mongoose.model('User', userSchema)

export function validateUser(payload:any){
    const schema = Joi.object({
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        email:Joi.string().required().email(),
        country:Joi.string().required(),
        language:Joi.string().required(),
        nationaty:Joi.string().required(),
        password:Joi.string().required(),
    })

    return schema.validateUser(payload)
}


