const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

module.exports.sendMail = async function sendMail(subject, text) {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    })
  );

  const mailOptions = {
    from: process.env.GMAIL_SENDER,
    to: process.env.GMAIL_LIST,
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
