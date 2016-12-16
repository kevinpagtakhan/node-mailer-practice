var path = require('path');
var dotenv = require('dotenv').load({silent: true});
var nodemailer = require('nodemailer');
var EmailTemplate = require('email-templates').EmailTemplate;
var ejs = require('ejs');

var templatesDir = path.join(__dirname, 'templates');
var template = new EmailTemplate(path.join(templatesDir, 'welcome'));

var locals = {
  email: 'helloworld@universe.com'
}

var smtpConfig = {
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: false, // use SSL
  auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
  },
  tls: {
      rejectUnauthorized: false
  }
};

var transporter = nodemailer.createTransport(smtpConfig);

template.render(locals, function(err, results) {
  var mailOptions = {
    from: '"FROM ME" <donotreply@to.me>', // sender address
    to: process.env.NODEMAILER_MAIL, // list of receivers
    subject: Date.now(), // Subject line
    html: results.html // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log(error);
      } else {
        console.log(info);
      }
  });
})
