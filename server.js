const mongoose = require("mongoose");
const app = require("./app");

var uri = "mongodb+srv://victorgold:victorgold@cluster0.nyjab7j.mongodb.net/reactForm?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB database connection established successfully");
    app.listen(5000, () => console.log("Server Running"));
  })
  .catch((error) => {
    console.log(`Connection error ${error}`);
  });
