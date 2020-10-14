const express = require("express");
const companyRouter = express.Router();
const Company = require("../schema/companySchema");
const developerGuest = require("../middleware/developerGuest");


/* GET company page. */
companyRouter.get("/companies", developerGuest, async (req, res) => {
  try {
    const comp = await Company.findOne({ email: req.user.email });
    if (comp) {
      res.render("companies",{user: comp});
    }
    else {
      res.render("/");
    }
  }
  catch (err) {
    return res.status(500);
  }
});

module.exports = companyRouter;
