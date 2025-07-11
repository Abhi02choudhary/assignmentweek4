const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;

// Set up pug as view engine
app.set("view engine", "pug");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/", require("./routes"));

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});