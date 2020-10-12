const LocalStrategy = require("passport-local").Strategy;
const Company = require("../schema/companySchema");
const bcrypt = require("bcrypt");

const init = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      //Login
      //check if email exists
      const user = await Company.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: "No Company with this email found" });
      }
      try {
        //comparing the password
        bcrypt.compare(password, user.password).then((match) => {
          if (match) {
            return done(null, user, { message: "Logged in success" });
          } else return done(null, false, { message: "Wrong Password" });
        });
      } catch (err) {
        //error
        return done(null, false, { message: "Something went wrong" });
      }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    Company.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

module.exports = init;
