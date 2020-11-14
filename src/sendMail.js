const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const env = require("dotenv").config().parsed;

module.exports.sendMail = (subject, text) => {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: env.GMAIL_USER,
        pass: env.GMAIL_PASSWORD,
      },
    })
  );

  const mailOptions = {
    from: env.GMAIL_SENDER,
    to: env.GMAIL_LIST,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("E-mail error, lol");
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
