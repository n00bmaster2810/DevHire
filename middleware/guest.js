const guest = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return next();
	}
	return res.redirect("/developers");
};

module.exports = guest;
