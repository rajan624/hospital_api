const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const middleware = require("./Middleware/verifyAuthentication");
require("dotenv").config();
const app = express();
const path = require("path");

app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
// Set up body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/static", express.static(path.join(__dirname, "Static")));
//routes
const authRouter = require("./routes/authRoute");
const doctorRoute = require("./routes/doctorRoute");
//unauthenticate routes
app.use("/doctors", authRouter);
// using middleware to authenticate user
app.use(middleware.Authentication);

//authenticate user
app.use("/patients", doctorRoute);

module.exports = app;
