const mongoose = require("mongoose");

const user = new mongoose.Schema(
	{
		firstName: {
		  type: String,
			require: true
		},
		lastName: {
			type: String,
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