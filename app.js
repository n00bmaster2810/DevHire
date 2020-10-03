const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const indexRouter = require('./routes/index');
const developerRouter = require("./routes/developerRouter");
const companyRouter = require("./routes/companyRouter");
const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");
const app = express();
const port = 3000 || process.env.PORT;
const passport = require("passport")
//mongoose connection setup using online cloud database
const uri = "mongodb+srv://satya:satya@cluster0.8csuv.mongodb.net/SHIELD?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongo connected");
}).catch((err) => {
  console.log("mongo not connected")
});

//passport config for sessions and storing login data
const passportInit = require("./config/passport")
passportInit(passport)
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());
app.use(express.json());

app.use('/', indexRouter);
app.use("/", developerRouter);
app.use("/", companyRouter);
app.use("/", registerRouter);
app.use("/", loginRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});