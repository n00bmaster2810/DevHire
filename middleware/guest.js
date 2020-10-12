const guest = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return next();
	}
	console.log(req);
	return res.redirect("/developers");
};

module.exports = guest;
