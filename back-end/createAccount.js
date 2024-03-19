const express = require("express");
const app = express();

app.use(express.json());
const cors = require("cors");

const mongoose = require("mongoose");
const { send } = require("process");

app.use(cors());
mongoose
  .connect("mongodb://localhost/meo")
  .then(() => console.log("connect to the data base"))
  .catch(() => console.log("field to connect to database"));
const courseSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  string: {
    type: String,
    required: true,
  },
});
const m = mongoose.model("Meo", courseSchema);
app.post("/signu", async (req, res) => {
  console.log(req.body);
  const checking = await m.find({ email: req.body.email });

  if (checking.length !== 0) {
    res.json({ action: "taken" });
    console.log("taken");
    return;
  }

  CreateAndSaveTheData(req.body)
    .then((string) => {
      res.json({ action: "created", string: string });
    })
    .catch((e) => {
      res.json({ action: "Error" });
      console.log(e);
    });
});
async function CreateAndSaveTheData(data) {
  let string = require("crypto").randomBytes(64).toString("hex");
  data.string = string;
  console.log(data);
  const newAccount = new m(data);
  await newAccount.save();
  return string;
}
app.post("/check", (req, res) => {
  console.log("checking");
  let find = m.find({ string: req.body });

  if (find.length !== 0) {
    res.send("sin");
    console.log("true");
  }
});
app.post("/signin", (req, res) => {
 
  check(req.body)
    .then(() => res.json({ action: "signin" }))
    .catch((e) => {
      console.log("error", e);
      res.json({ action: "Error" });
    });
});
async function check(data) {
  const account = await m.find({ ...data });
  if (account.length === 0) {
    console.log({ success: false });
    return;
  }

  console.log({ success: true });
}

app.listen(2000, () => {
  console.log("2000");
});
