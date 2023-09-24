import mongoose from "mongoose";
const Joi = require("joi-browser");

const answerSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  answer: { type: String, required: true },
});

export const Answer = mongoose.model("Answer", answerSchema);

export const validate = (ans: any) => {
  const schema = Joi.object({
    questionId: Joi.string().required(),
    answer: Joi.string().required(),
  });

  return schema.validate(ans);
};
