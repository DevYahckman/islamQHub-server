import express from "express";
import { Answer, validate } from "../models/answer";

const router = express.Router();

// router.get("/", asyc (req: any, res: any, next:any) => {
//  try {
//     const ans = await Answer.find()

//  } catch (err) {

//  }
// });

router.get("/", async (req: any, res: any, next: any) => {
  try {
    const ans = await Answer.find();
    res.send(ans);
  } catch (err) {
    console.log(err);
    res.status(500).send("unavle to save");
  }
});

router.get("/:id", async (req: any, res: any, next: any) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer)
      return res.status(400).send("The given anser is not available");
    res.send(answer);
  } catch (err) {
    console.log(err);
    res.status(401).send("Invalid data");
  }
});

router.post("/", async (req: any, res: any, next: any) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const ans = new Answer({
      questionId: req.body.questionId,
      answer: req.body.answer,
    });

    await ans.save();
    res.send(ans);
  } catch (err) {
    console.log(err);
  }
});

// module.exports = router

export default router;
