const mongoose = require("mongoose");

const experience = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    type: {
      type: String,
    },
    company: {
      type: String,
      require: true,
    },
    location: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    media: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", experience);
