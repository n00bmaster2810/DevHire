const mongoose = require("mongoose");

var myPortfolio = new mongoose.Schema(
	{
		firstName: {
		  type: String,
			require: true
		},
		lastName: {
			type: String,
			require: true
		},
		email: {
		  type: String,
			require: true
		},
		linkedIn: {
			type: String,
			require: true
        },
        school: {
			type: String,
			require: true
        },
        institution: {
			type: String,
			require: true
        },

        resumeLink: {
			type: String,
			require: true
        },
        CPI: {
			type: String,
			require: true
		},
		img:
		{
		  data :Buffer,
		  contentType :String
		  

		}

	  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", myPortfolio);