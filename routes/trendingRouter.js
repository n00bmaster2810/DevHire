const express = require("express");
const router = express.Router();
const guest = require("../middleware/guest");
const Company = require("../schema/companySchema");


/* GET home page. */
router.get("/trending", function (req, res, next) {
  let flag = true;
  if (req.query.fltrname) {
    const regex = new RegExp(escapeRegex(req.query.fltrname), "gi");
    Company.find({ name: regex }, (err, companies) => {
      console.log(companies);
      if (err) {
        console.log(error);
      } else {
        if (companies.length < 1) {
          flag = false;
          res.redirect("/trending");
        }
        res.render("show", {companies: companies});
      }
    });
  } else {
    Company.find({}, (err, companies) => {
      console.log(companies);
      if (err) {
        console.log(error);
      } else {
        let error;
        if (!flag) error = "No matching results found";
        res.render("show", {companies: companies}, {error: error});
      }
    });
  }
});

const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
