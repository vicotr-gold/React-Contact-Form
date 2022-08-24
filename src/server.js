const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const contacts = require("./model");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));

var uri = "mongodb+srv://victorgold:victorgold@cluster0.nyjab7j.mongodb.net/reactForm?retryWrites=true&w=majority";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});
connection.on("error", (err) => console.log(`Connection error ${err}`));

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "***************@gmail.com",
    pass: "********",
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", async (req, res) => {
  try {
    const name = req.body.firstName + " " + req.body.lastName;
    const email = req.body.email;
    const message = req.body.message;
    const mail = {
      from: name,
      to: "victor.popanode93@gmail.com",
      subject: "Contact Form Message",
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    };
    await contactEmail.sendMail(mail);
    await contacts.insertMany(req.body);
    res.send({ status: "SUCCESS", message: "Message sent successfully." });
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: error.message });
  }
});
