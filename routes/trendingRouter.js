const express = require("express");
const router = express.Router();
const guest = require("../middleware/guest");
const Company = require("../schema/companySchema");


/* GET home page. */
router.get("/trending", function (req, res, next) {
  if (req.query.fltrname) {
    const regex = new RegExp(escapeRegex(req.query.fltrname), "gi");
    Company.find({ name: regex }, (err, companies) => {
      if (err) {
        res.status(500).send();
        console.log(error);
      } else {
        res.render("show", {companies: companies});
      }
    });
  } else {
    Company.find({}, (err, companies) => {
      if (err) {
        res.status(500).send();
        console.log(err);
      } else {
        res.render("show", {companies: companies});
      }
    });
  }
});

const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
