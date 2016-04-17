var loopback = require('loopback');
var boot = require('loopback-boot');
var PassportConfigurator =  require('loopback-component-passport').PassportConfigurator;
var path = require('path');

var app = module.exports = loopback();
app.set('view engine', 'ejs'); // LoopBack comes with EJS out-of-box
app.set('json spaces', 2); // format json responses for easier viewing
app.set('views', path.resolve(__dirname, 'views'));

// middleware that tracks user token through token. Used by Passport, don't remove !
// need cookie-parser to be set in middleware.json
// don't know how to put it on middleware.json (as model is an object)
app.use(loopback.token({ model: app.models.accessToken, currentUserLiteral: 'me'}));


// must be set to serve views properly when starting the app via `slc run` from
// the project root


app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;


  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
