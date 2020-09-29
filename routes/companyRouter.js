const express = require("express");
const companyRouter = express.Router();

/* GET company page. */
companyRouter.get("/companies", function (req, res) {
  res.render("companies");
});

module.exports = companyRouter;
