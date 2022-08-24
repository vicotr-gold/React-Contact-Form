const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const contacts = require("./src/model");

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
    if (!req?.body?.firstName || !req?.body?.lastName || !req?.body?.email || !req?.body?.message) {
      return res.status(400).json({ status: "ERROR", message: "Please provide correct data." });
    }
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
    res.json({ status: "SUCCESS", message: "Message sent successfully." });
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: error.message });
  }
});

module.exports = router;
