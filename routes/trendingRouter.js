const express = require("express");
const router = express.Router();
const guest = require("../middleware/guest");

/* GET home page. */
router.get("/trending", function (req, res, next) {
  res.render("show");
});

module.exports = router;
