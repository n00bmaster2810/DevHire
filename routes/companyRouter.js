const express = require("express");
const companyRouter = express.Router();
const developerGuest = require("../middleware/developerGuest");


/* GET company page. */
companyRouter.get("/companies",developerGuest, function (req, res) {
  res.render("companies");
});

module.exports = companyRouter;
