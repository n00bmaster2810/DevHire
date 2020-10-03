const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../schema/userSchema");
const passport = require("passport");
const loginRouter = express.Router();

loginRouter.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) {
			next(err);
		}
		if (!user) {
			return res.redirect("/");
		}
		req.logIn(user, (err) => {
			if (err) {
				next(err);
			}
			return res.redirect("/developers");
		});
	})(req, res, next);
});

module.exports = loginRouter;
