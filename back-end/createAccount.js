const express = require("express");
const app = express();

app.use(express.json());
const cors = require("cors");

const mongoose = require("mongoose");

app.use(cors());
mongoose
  .connect("mongodb://localhost/meo")
  .then(() => console.log("connect to the data base"))
  .catch(() => console.log("field to connect to database"));
const usersSchema = new mongoose.Schema({
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
const m = mongoose.model("Meo", usersSchema);
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
// ----------------------------------------------------------------------------------------------------------------------------------------
mongoose
  .connect("mongodb://localhost/message")
  .then(() => console.log("connect to the data base messages"))
  .catch(() => console.log("field to connect to database messages"));
const messagesSchema = new mongoose.Schema({
  msgValue: {
    type: String,
    required: true,
  },

  time: {
    type: Date,
    required: true,
  },
  string: {
    type: String,
    required: true,
  },
});
let msg = mongoose.model("Msg", messagesSchema);
app.post("/messages", async (req, res) => {
  console.log(req.body, "req.body");
  if (req.body.string === null || undefined || 0 || "" || false) {
    console.log("error");
    res.status(404).json({ msg: "error" });
    return;
  }
  let time = new Date();
  let obj = {
    msgValue: req.body.value,
    time: time,
    string: req.body.string,
  };
  const message = new msg(obj);
  await message.save();
  res.json({ string: req.body.string });
});
app.post("/data", async (req, res) => {
  let findAllMessages = await msg.find().limit(30);

  res.json({ messages: findAllMessages, string: req.body.string });
});
app.listen(2000, () => {
  console.log("2000");
});
//{}
