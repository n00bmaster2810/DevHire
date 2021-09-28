const express = require("express");

const router = express.Router();
const guest = require("../middleware/guest");
const comModel = require("../schema/companySchema");
const company = comModel.find({});
/* GET home page. */
router.get("/", guest, function (req, res, next) {
  res.render("index");
});

router.get("/login", guest, (req, res) => {
  res.render("login");
});

router.get("/register", guest, (req, res) => {
  res.render("register");
});

module.exports = router;
