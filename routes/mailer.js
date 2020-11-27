const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('', (req, res, next)=>{

    let body = req.body.body;

    //TODO: move this!!!
    var account = {
        user: "superchargertest@gmail.com",
        pass: "&giraffeseatwindmills2"
    }

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass, // generated ethereal password
      },
    });  
    
    var mailOptions = {
        from: 'superchargertest@gmail.com', // sender address
        to: 'rrossilli55@gmail.com, kwang@chta.ventures ', // list of receivers
        subject: 'Supercharger', // Subject line
        html: body// plain text body
      };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
          res.json({ err: err, currentObject: null, message: "Email sent!"})
     });
});

module.exports = router;
