require('dotenv').config()
import express from "express";
const app = express();
import mongoose from "mongoose";
const question = require("./routes/question");
import answer from './routes/answers'
import user from './routes/user'
import auth from './routes/auth'

app.use(express.json());
app.use("/api/question", question);
app.use("/api/answer",answer);
app.use("/api/user",user);
app.use("/api/auth",auth);

// app.get('/', (req:any,res:any)=>{
//     res.send('my own')
// })


mongoose
  .connect("mongodb://127.0.0.1:27017/islamQHub")
  .then(() => console.log("connect to MongoDB"))
  .catch((err) => console.log("Could not connect", err));

const port = 5000;
app.listen(port, () => console.log(`listening on port ${port}`));
