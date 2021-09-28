const nodemailer = require("nodemailer");
require("dotenv").config();
const transport = nodemailer.createTransport({
	host: "smtp.gmail.com",
	service: "gmail",
	auth: { type: "login", user: process.env.user, pass: process.env.pass },
	tls: { rejectUnauthorized: false },
});

module.exports = {
	sendEmail(from, to, subject, html) {
		transport.sendMail({ from, subject, to, html }, (err, info) => {
			if (err) {
				console.log(err);
			} else console.log("Sent");
		});
	}
}