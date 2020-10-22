const mongoose = require("mongoose");

const apply = new mongoose.Schema(
  {
    company_id: {
      type: String,
    },
    post_id: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
	},
	
  },
  { timestamps: true }
);

module.exports = mongoose.model("Apply", apply);
