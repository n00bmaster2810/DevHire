const guest = (req, res, next) => {
	if (!req.isAuthenticated()) {
		next();
	}
	return res.redirect("/developers");
};

module.exports = guest;
