const express = require("express");
const passport = require("passport");
const loginDevRouter = express.Router();

loginDevRouter.post("/loginDev", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      req.flash("error", info.message);
      return next(err);
    }
    if (!user) {
      req.flash("error", info.message);
      return res.redirect("/");
    }
    req.logIn(user, (err) => {
      if (err) {
        req.flash("error", info.message);
        return next(err);
      }
      return res.redirect("/developers");
    });
  })(req, res, next);
});

module.exports = loginDevRouter;
