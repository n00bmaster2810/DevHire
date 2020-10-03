const mongoose = require("mongoose");

var user = new mongoose.Schema(
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
			require: true, 
			unique: true
		},
		password: {
			type: String,
			require: true
		}
	  
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", user);