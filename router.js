const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const contacts = require("./src/model");

const contactEmail = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "81df5354e792f2",
    pass: "6bdb599f72624f",
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
      from: email,
      to: "victor.popanode93@gmail.com",
      subject: "Contact Form Message",
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    };
    const emailStatus = await contactEmail.sendMail(mail);
    await contacts.insertMany(req.body);
    res.json({ status: "SUCCESS", message: "Message sent successfully." });
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: error.message });
  }
});

module.exports = router;
