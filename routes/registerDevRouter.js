const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../schema/userSchema");
const Developer = require("../schema/developerSchema");
const registerDevRouter = express.Router();

registerDevRouter.post("/registerDev", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  //validate request
  if (!firstName || !lastName || !email || !password) {
    req.flash("error", "All fields are mandatory");
    req.flash("firstname", firstName);
    req.flash("lastname", lastName);
    req.flash("email", email);
    return res.redirect("/");
  }

  //Check if email exists
  User.exists({ email: email }, (err, result) => {
    if (result) {
      req.flash("error", "Email Exists");
      return res.redirect("/");
    }
  });

  //password hashing by use of bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  const developer = new Developer({
    email: email,
    password: hashedPassword,
  });
  try {
    await developer.save();
    res.redirect("/");
  } catch (err) {
    res.status(500);
  }

  //storing req body data in database
  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.redirect("/");
  } catch (err) {
    res.status(500);
  }
  console.log(req.body);
});

module.exports = registerDevRouter;
