const express = require("express");
const router = express.Router();
const guest = require("../middleware/guest");

/* GET home page. */
router.get('/',guest, function(req, res, next) {
  res.render('index');
});

module.exports = router;
