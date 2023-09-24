import express from "express";
const router = express.Router();
import { Question, validate } from "../models/question";

router.get("/", async (req: any, res: any, next: any) => {
  const qustions = await Question.find();
  res.send(qustions);
  // console.log(qustions);
});



router.post("/", async (req: any, res: any, next: any) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const quest = new Question({
      question: req.body.question,
      category: req.body.category,
    });
    await quest.save();
    res.send(quest);
  } catch (err) {
    console.log(err);

    res.status(500).send("unavle to save");
  }
});

module.exports = router;
