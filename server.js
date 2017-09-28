if (process.env.NODE_ENV == "production") {
  require('newrelic');
}
var express = require('express');
var port = process.env.PORT || 3000;
var routes = require('./routes');
var app = express();

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static('public', { maxAge:2592000000 } ));
  return app.use(app.router);
});

app.configure('development', function() {
  return app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('production', function() {
  return app.use(express.errorHandler());
});

app.get('/', routes.home);
app.get("/:icon", routes.icon);

routes.initialize();

app.routes.get[1].regexp = /^\/(?:(.+?))\/?$/i;

app.listen(port, function() {
  return console.log("Listening on " + port + "\nPress CTRL-C to stop server.");
});

exports = module.exports = app;