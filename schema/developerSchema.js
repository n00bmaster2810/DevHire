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
    institution: {
      type: String,
      required:true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Developer", developer);
