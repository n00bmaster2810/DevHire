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
		username: {
		  type: String,
			require: true
		},
		password: {
			type: String,
			require: true
		}
	  
  },
  { timestamps: true }
);

modules.export = mongoose.model("Users", user);