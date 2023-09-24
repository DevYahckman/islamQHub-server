import express from "express";
import { User, validate, IUserSchema } from "../models/user";
const router = express.Router();
import _ from "lodash";
import bcrypt from "bcrypt";

router.get("/", (req: any, res: any) => {
  res.send("User");
});

router.post("/", async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");

    user = new User(
      _.pick(req.body, [
        "firstName",
        "lastName",
        "email",
        "language",
        "nationality",
        "country",
        "password",
      ])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    // @ts-ignore
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .header("access-control-headers", "x-auth-token")
      .send(
        _.pick(user, [
          "id",
          "firstName",
          "lastName",
          "email",
          "language",
          "nationality",
          "country",
        ])
      );
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
