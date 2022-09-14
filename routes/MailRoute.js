var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
var fs = require('fs')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res, next) => {
  let email = req.body.is_Email;
  let subject = req.body.is_Subject;
  var password = req.body.is_Password;
  password = password.substr(0, 20)
  
  let transporter = nodemailer.createTransport({
    service: 'Naver',
    host: 'smtp.naver.com',
    port: 587,
    secure: false,
    auth: {
      user: 'muinise74@naver.com',
      pass: 'moon200374*'
    }
  });

  home_url = 'http://localhost:3000'
  var toHtml = ''
  fs.readFile(__dirname+'/template/mail_template_pw.html', function (err, html) {
    toHtml = html.toString()
    toHtml = toHtml.replace('{replacetext}', home_url+'/PwChangeForm/'+ email +'/'+password)
  })

  setTimeout(function() {
    let mailOptions = {
      from: 'muinise74@naver.com',
      to: email,
      subject: subject,
      html : toHtml
    };
    console.log(transporter)
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.send("error");
      }
      else {
        console.log('Email sent: ' + info.response);
        res.send("succ");
      }
    });
  }.bind(this),1000);
});

module.exports = router;