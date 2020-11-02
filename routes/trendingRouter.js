const express = require("express");
const router = express.Router();
const guest = require("../middleware/guest");
const Company = require("../schema/companySchema");
const Developer = require("../schema/developerSchema");


/* GET home page. */ 
router.get("/trending", async (req, res) => {
  try {
    const dev = await Developer.findOne({ email: req.user.email });
    const companies = await Company.find({ _id: { $nin: dev.subscribed } });
    res.render("show", { companies: companies, dev: dev });
    //await Company.find({}, (err, companies) => {
    //  if (err) {
    //    res.status(500).send();
    //    console.log(err);
    //  } else {
    //    res.render("show", { companies: companies, dev: dev });
    //  }
    //});
  }
  catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
})
  .get("/search", async (req, res) => {
    try {
      console.log(req.query);
      console.log(req.session.dev);
      if (req.query.fltrname) {
        const regex = new RegExp(escapeRegex(req.query.fltrname), "gi");
        const dev = await Developer.findOne({ email: req.user.email });
        Company.find({ name: regex }, (err, companies) => {
          if (err) {
            res.status(500).send(err);
            console.log(error);
          } else {
            res.render("search", { companies: companies, dev: dev });
          }
        });
      }
      else {
        const dev = await Developer.findOne({ email: req.user.email });
        console.log(dev);
        const companies = [];
        res.render("search", {companies:companies, dev: dev });
      }
    }
    catch (err) {
      res.status(500).send(err);
    }
  
})

const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
