// Generated by CoffeeScript 1.6.2
(function() {
  var createServer, express, sg;

  express = require('express');

  sg = require('sendgrid-nodejs');

  createServer = function() {
    var app;

    app = express();
    app.configure(function() {
      var port;

      app.use('/app', express["static"]('../../client/app'));
      app.use(express.bodyParser());
      app.use(app.router);
      port = process.env.PORT || 8081;
      return app.listen(port);
    });
    app.post('/submit', function(req, res) {
      var from, header, html, mail, mailForVolunteer, sender, signup, text;

      if (req.body == null) {
        return;
      }
      signup = req.body;
      html = signup.html;
      delete signup.html;
      signup = JSON.stringify(signup, null, 4);
      header = "" + req.body.firstName + " " + req.body.lastName + " <" + req.body.email + "> just signed up to volunteer with CoderDojo Ponce Springs!\n\n";
      text = header + signup;
      html = header + html;
      from = 'josh.gough@versionone.com';
      mail = new sg.Email({
        to: 'josh.gough@versionone.com',
        from: from,
        subject: 'test mail',
        text: text,
        html: html
      });
      header = "Thank you " + req.body.firstName + " " + req.body.lastName + " for volunteering with CoderDojo Ponce Springs! Please remember to fill out the attached background check authorization form and return it to us (instructions within document) so you can get started!\n\nHere is a copy of the information you submitted to us:\n\n";
      text = header + signup;
      html = header + html;
      mailForVolunteer = new sg.Email({
        to: req.body.email,
        from: from,
        subject: 'Confirmation of CoderDojo Ponce Springs sign up received',
        text: text,
        html: html
      });
      sender = new sg.SendGrid('azure_087394ee528ccb83063ec69cc1b4f2cf@azure.com', 'jpzmaq95');
      sender.send(mail, function(success, err) {
        if (success) {
          return console.log('Email sent');
        } else {
          return console.log(err);
        }
      });
      sender.send(mailForVolunteer, function(success, err) {
        if (success) {
          return console.log('Email sent to volunteer');
        } else {
          return console.log(err);
        }
      });
      return res.send({
        status: 200,
        message: 'Success'
      });
    });
    return app;
  };

  module.exports = createServer;

}).call(this);
