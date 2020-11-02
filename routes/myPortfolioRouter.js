const express = require("express");
const Portfolio = require("../schema/myPortfolioSchema");
const myPortfolioRouter = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + "-" + new Date.now());
  },
});
const upload = multer({ storage: storage });
myPortfolioRouter.post("/myPortfolio", upload.single("image"), async (req, res) => {
  const { firstName, lastName, email, linkedIn, school, institution, resumeLink, CPI } = req.body;

  //validate request
  if (!firstName || !lastName || !email || !linkedIn || !school || !intitution || !resumeLink || !CPI) {
    return res.redirect("/developers");
  }



  const myPortfolio = new Portfolio(
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      linkedIn: linkedIn,
      school: school,
      institution: institution,
      resumeLink: resumeLink,
      CPI: CPI,
      img: req.file.path,
    }
  );
  try {
    await myPortfolio.save();
    res.redirect("/developers");
  } catch (err) {
    return res.status(500);
  }
  console.log(req.body);
});

module.exports = myPortfolioRouter;