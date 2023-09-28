import mongoose from "mongoose";
const Joi = require("joi-browser");
import jwt from "jsonwebtoken";

export interface IUserSchema {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  country: string;
  language?: string;
  nationality: string;
  isAdmin?: boolean;
}

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  language: { type: String, required: true },
  nationality: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: Boolean,
});

const key: any = process.env.JWT_PRIVATE_KEY;

userSchema.methods.generateAuthToken = function (this: IUserSchema) {
  const token = jwt.sign(
    { _id: this._id, name: this.lastName, isAdmin: this.isAdmin },
    key,
    { expiresIn: "120s" }
  );
  return token;
};

export const User = mongoose.model("User", userSchema);

export const validate = (payload: any) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    country: Joi.string().required(),
    language: Joi.string().required(),
    nationality: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validate(payload);
};
