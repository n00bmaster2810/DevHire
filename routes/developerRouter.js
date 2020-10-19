const express = require("express");
const developerRouter = express.Router();
const developerGuest = require("../middleware/developerGuest");

/* GET developers page. */
developerRouter
  .get("/developers", developerGuest, function (req, res) {
    res.render("developers");
  })
  .get("/developers/profile", developerGuest, (req, res) => {
    res.render("devProfile");
  });

module.exports = developerRouter;
