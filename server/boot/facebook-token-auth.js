var PassportConfigurator =  require('loopback-component-passport').PassportConfigurator;

var getCurrentUser = require('../middleware/context-currentUser');

module.exports = function (app) {

  // configure passport
  var passportConfigurator = new PassportConfigurator(app);

  passportConfigurator.init();

  passportConfigurator.setupModels({
    userModel: app.models.MyUser,
    userIdentityModel: app.models.UserIdentity,
    userCredentialModel: app.models.UserCredential
  });

  // configure facebook token connector - see ../../providers.json for config
  passportConfigurator.configureProvider('facebook-token', require('../../providers.json')['facebook-token']);

  // create custom callback routes
  app.use("/auth/facebook-token/success", app.loopback.context(), getCurrentUser(),  function(req, res){
    var ctx = app.loopback.getCurrentContext();
     var token =  ctx.get('accessToken');
     var user = ctx.get('currentUser');
    user.access_token = token;
    console.log(user.username, "successfully logged in through facebook long term token ");
    res.send(user.toJSON());
  });


  app.use("/auth/facebook-token/failure", function(req, res){
    console.log("failure");
    res.status(500).send({"error":"Unable to find or create user from facebook token"});
  });

};
