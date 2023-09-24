import mongoose from "mongoose";
const Joi = require( 'joi-browser')


const questionSchema = new mongoose.Schema({
    question:{type:String, required:true},
    category:{type:String, enum:['Shirk', 'Inovation', 'others']}
})


export const Question = mongoose.model('Question', questionSchema)


export const validate = ( quest:string )=>{
    const schema = Joi.object({
        question: Joi.string().required(),
        category: Joi.string().required()
    })

    return schema.validate(quest)
}



// exports.validate=validate
// exports.Question= Question