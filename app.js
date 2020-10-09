require("dotenv").config();
const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session"); //package for session
const flash = require("express-flash"); //package for displaying messages on the front end
const MongoDbStore = require("connect-mongo")(session); //package to store session in our mongo database

// router imports
const indexRouter = require('./routes/index');
const developerRouter = require("./routes/developerRouter");
const companyRouter = require("./routes/companyRouter");
const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");
const myPortfolioRouter = require("./routes/myPortfolioRouter");
const jobPostRouter = require("./routes/jobPostRouter");


const app = express();
const port = 3000 || process.env.PORT;

//mongoose connection setup using online cloud database
const uri = "mongodb+srv://satya:satya@cluster0.8csuv.mongodb.net/SHIELD?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongo connected");
}).catch((err) => {
  console.log("mongo not connected");
});

//sesion store
let mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  collection: "sessions", 
})

//session config
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: mongoStore,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(flash());

//passport config for sessions and storing login data
const passportInit = require("./config/passport")
passportInit(passport)
app.use(passport.initialize());
app.use(passport.session());

//Global middleware can be used accessed anywhere so as to help store the user login in session
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

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
app.post("/logout", (req, res) => {
  req.logout();
  return res.redirect("/");
})

app.use("/",jobPostRouter);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});