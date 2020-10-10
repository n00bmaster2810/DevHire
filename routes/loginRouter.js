const express = require("express");
const passport = require("passport");
const Developer = require("../schema/developerSchema");
const Company = require("../schema/companySchema");
const loginRouter = express.Router();

loginRouter.post("/login", (req, res, next) => {
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
      //Developer.find({ email: user.email }).then(
      //	res.redirect("/developers")
      //);
      //return res.redirect("/companies");
      
    });
  })(req, res, next);
});

module.exports = loginRouter;
