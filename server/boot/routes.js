var getCurrentUser = require('../middleware/context-currentUser');
var loopback = require('loopback');

module.exports = function(app) {
  var router = app.loopback.Router();

  router.get('/messages', function(req, res, next) {
    // find all Messages
    //app.models.Message.find({include: 'category'}, function (err, messages) {
    //  if (err) return next(err);
    //  res.render('messages', {messages: messages})
    //});
  });
    router.use('/user', getCurrentUser(),  function(req, res, next){

      if (req.body) {
        var username = req.body.username;
        var password = req.body.password;
      }

      if (username && password){
        app.models.MyUser.login({
          username: username,
          password:password
        },'user',function(err,token){
          if (err)
            return res.render('user', {username:username, password:password, loginFailed:true});

          token = token.toJSON();
          console.log("Welcome "+ token.user.username);

          res.render('user', {user: token.user, token: token, login:true});
        });
      } else {
        var token = req.accessToken;
        var ctx = loopback.getCurrentContext();
        var user = ctx.get('currentUser');

        res.render('user', {'user': user, 'token': token})
      }
    });


  app.use(router);
}
