//create the admin role
// working ?
var path = require('path');
var app = require(path.resolve(__dirname, '../server/server'));
var Role = app.models.Role;
var RoleMapping = app.models.RoleMapping;
var User = app.models.MyUser;

var cb = function(err){
  console.log(err);

};

User.create(
  {username: 'admin', email: 'john@doe.com', password: 'admin'}
  , function(err, user) {
  if (err) return cb(err);
  console.log("user", user);
  //create the admin role

    Role.create({
    name: 'admin'
  }, function(err, role) {
    if (err) cb(err);
    console.log("role", role);
    //make user an admin
    role.principals.create({
      principalType: RoleMapping.USER,
      principalId: user.id
    }, function(err, principal) {
      if (err) cb(err);
      console.log("map", principal)
    });
  });
    user.save(); // why?
});

