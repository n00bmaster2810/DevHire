const mongoose = require("mongoose");

const developer = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    devPic: {
      type: String
    },
    level: {
      type: String,
      required:true,
    },
    institution: {
      type: String,
      required:true,
    },
    subscribed: [{
      type: String, 
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Developer", developer);
