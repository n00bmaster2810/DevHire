const express = require("express");
const Portfolio = require("../schema/myPortfolioSchema");
const myPortfolioRouter = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Data.now());
  },
});
const upload = multer({ storage: storage });
myPortfolioRouter.post("/myPortfolio", upload.single("image"), async (req, res) => {
  const { firstName, lastName, email, linkedIn, school, institution, resumeLink, CPI } = req.body;

  //validate request
  if (!firstName || !lastName || !email || !linkedIn || !school || !intitution || !resumeLink || !CPI) {
    return res.redirect("/");
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
      img: {
        data: firstName.readFileSync(path.join(__dirname + "/uploads" + req.file.filename)),
        contentType: "image/png",
      },
    }
  );
  try {
    await myPortfolio.save();
    res.redirect("/");
  } catch (err) {
    res.status(500).send(err);
  }
  console.log(req.body);
});

module.exports = myPortfolioRouter;