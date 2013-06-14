// Generated by CoffeeScript 1.6.2
(function() {
  var createServer, express, _;

  express = require('express');

  _ = require('underscore');

  createServer = function() {
    var app;

    app = express();
    app.configure(function() {
      var port;

      app.use('/app', express["static"]('../../client/app'));
      app.use(app.router);
      port = process.env.PORT || 8081;
      return app.listen(port);
    });
    return app;
  };

  module.exports = createServer;

}).call(this);
