const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../schema/userSchema");
const registerRouter = express.Router();



registerRouter.post("/register", async (req, res) => {
	
  const { firstName, lastName, email, password } = req.body;

  //validate request
  if (!firstName || !lastName || !email || !password) {
    return res.redirect("/");
  }
  //password hashing by use of bcrypt
	const hashedPassword = await bcrypt.hash(password, 10);
	
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
    res.status(500).send(err);
  }
  console.log(req.body);
});

module.exports = registerRouter;