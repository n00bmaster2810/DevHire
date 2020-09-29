const express = require("express");
const developerRouter = express.Router();

/* GET developers page. */
developerRouter.get("/developers", function (req, res) {
  res.render("developers");
});

module.exports = developerRouter;
