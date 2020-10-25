const mongoose = require("mongoose");

const certificate = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    organisation: {
      type: String,
      required: true,
    },
    issueDate: {
      type: Date,
      required: true,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", certificate);
