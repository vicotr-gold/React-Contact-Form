const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let contact = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name required"],
      maxlength: 25,
    },
    lastName: {
      type: String,
      required: [true, "Last Name required"],
      maxlength: 25,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
      required: [true, "Email required"],
      maxlength: 50,
    },
    message: {
      type: String,
      required: [true, "Message required"],
      maxlength: 500,
    },
  },
  { collection: "contacts" }
);

module.exports = mongoose.model("contacts", contact);
