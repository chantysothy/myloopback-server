/*
 To be replaced by your model_name:
 - l.12, l.18 : ModelName
 - l.15 : Data Source filename (./model_name.json)

 */

var path = require('path');
var async = require('loopback/node_modules/async');  //use parallels tasks

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.mainDS;

var models = [
  {"name":"Message", "source":"./messages.json"},
  {"name":"MyUser", "source":"./myuser.json"}

];





function doAutoMigrate(next) {

  async.each(models, function(model, callback){
    ds.automigrate(model.name, function(err, createdmodel) {
      if (err) throw err;
      console.log('Create model: ', model.name);
      callback();
    })
    }, function(err) {
      if (err) throw err;
      console.log("All models created");
      next();
    }
  );
}

function doLoad(next){
  async.each(models, function(model, callback){
    var items = require(model.source);
    // load each idem

    async.each(items, function(item, callback2) {
      app.models[model.name].create(item, function(err, createdModel){
        if (err) throw err;
        console.log("Create item:", createdModel);
        callback2();

      })
    },
    function(){
      callback();
    })



  }, next());
}



// Migrate then load then disconnect
// may use async
doAutoMigrate(function(){
  doLoad(function(){
    ds.disconnect();
  })
});
