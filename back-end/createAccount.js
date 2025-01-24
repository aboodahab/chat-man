const multer = require("multer");
express=require("express")
app=express()
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
  img: {
    type: String,
    required: false,
  },

  string: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: false,
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

  createTheDataAndSaveIt(req.body)
    .then((string) => {
      res.json({ action: "created", string: string });
    })
    .catch((e) => {
      res.json({ action: "Error" });
      console.log(e);
    });
});
async function createTheDataAndSaveIt(data) {
  let string = require("crypto").randomBytes(64).toString("hex");
  data.string = string;
  data.img = "";
  data.userName = data.name;
  console.log(data.img);
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
    .then((r) => {
      if (r.status === "error") {
        return res.json({ action: "error" });
      }
      console.log(r);

      res.json({ action: "signin", string: r.string });
    })
    .catch((e) => {
      console.log("not in the then");
      console.log("error", e);
      res.json({ action: "Error" });
    });
});

async function check(data) {
  const account = await m.find({ ...data });
  if (account.length === 0) {
    return { status: "error" };
  }
  console.log(account);
  return { status: "signin", string: account[0].string };
}
// ----------------------------------------------------------------------------------------------------------------------------------------

const messagesSchema = new mongoose.Schema({
  msgValue: {
    type: String,
    required: true,
  },
  name: {
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
  if (req.body.string === null) {
    console.log("error");
    res.status(404).json({ msg: "error" });
    return;
  }
  let time = new Date();
  let obj = {
    msgValue: req.body.value,
    time: time,
    name: req.body.name,
    string: req.body.string,
  };
  const message = new msg(obj);
  await message.save();
  res.json({ string: req.body.string, time });
});
app.post("/data", async (req, res) => {
  let arr = [];
  let findAllMessages = await msg.find().limit(100);
  console.log(req.body.string);
  for (const msg of findAllMessages) {
    let findImg = await m.findOne({ string: JSON.parse(msg.string) });

    msg.img = findImg.img;

    arr.push({ ...msg.toJSON(), img: findImg.img });
  }
  res.json({
    messages: arr,
    string: req.body.string,
  });
});
app.post("/chocks", async (req, res) => {
  let newMessages = await msg.find({ time: { $gt: req.body.time } });
  if (!newMessages) {
    return res.json({ new: "", success: false });
  }
  res.json({ new: newMessages, success: true });
});
//------------------------------------------------------------------------------------------------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/files", upload.single("file"), async (req, res) => {
  console.log(req.file.filename, "youtube.cm");
  let u = await m.updateOne(
    { string: req.body.string },
    { img: req.file.path }
  );
  console.log(u, req.body.string);
  res.json({ message: "File uploaded successfully!" });
});
app.use("/uploads", express.static(__dirname + "/uploads"));
app.listen(2000, () => {
  console.log("2000");
});
//{}
