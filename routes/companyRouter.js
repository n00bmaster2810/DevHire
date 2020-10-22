const express = require("express");
const companyRouter = express.Router();
const Company = require("../schema/companySchema");
const developerGuest = require("../middleware/developerGuest");

/* GET company page. */
companyRouter
  .get("/companies", developerGuest, async (req, res) => {
    try {
      const comp = await Company.findOne({ email: req.user.email });
      if (comp) {
        res.render("companies", { user: comp });
      } else {
        res.render("/");
      }
    } catch (err) {
      return res.status(500);
    }
  })
  .get("/companies/:id", developerGuest, async (req, res) => {
    try {
      console.log(req.params.id);
      const comp = await Company.findOne({ _id: req.params.id });
      if (comp) {
        res.render("companyProfile", { user: comp });
      } else {
        res.redirect("/companies");
      }
    } catch (err) {
      res.redirect("/companies");
    }
  });

module.exports = companyRouter;
