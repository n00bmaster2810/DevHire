const express = require("express");
const developerRouter = express.Router();
const developerGuest = require("../middleware/developerGuest");

/* GET developers page. */
developerRouter.get("/developers", developerGuest, function (req, res) {
  res.render("developers");
});

module.exports = developerRouter;
