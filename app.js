const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');
const developerRouter = require("./routes/developerRouter");
const companyRouter = require("./routes/companyRouter");


const app = express();
const port = 3000 || process.env.PORT;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/", developerRouter);
app.use("/", companyRouter);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});