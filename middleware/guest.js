const Developer = require("../schema/developerSchema");
const Company = require("../schema/companySchema");

const guest = async (req, res, next) => {
	try {
		if (!req.isAuthenticated()) {
			return next();
		}
		const comp = await Company.findOne({ email: req.user.email });
		const dev = await Developer.findOne({ email: req.user.email });
		if (comp) {
			return res.redirect("/companies");
		}
		else if (dev) {
			return res.redirect("/developers");
		}
		else {
			next();
		}
	}
	catch {
		next();
	}
};

module.exports = guest;
