const express = require("express");
const companyProfileRouter = express.Router();

/* GET company page. */
companyProfileRouter.get("/companyProfile", function (req, res) {
  res.render("companyProfile");
});

module.exports = companyProfileRouter;
