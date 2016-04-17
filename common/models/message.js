var loopback = require('loopback');
module.exports = function(Message) {

  // Custom method: get 3 random messages
  Message.random = function(cb) {
    var ds = Message.dataSource;
    ds.connector.query('select * from Message ORDER BY random() LIMIT 3', function (err, messages) {
      if (err) {
        console.error(err);
      } else {
        console.log(messages);
      }
      cb(err, messages);
    });
  };

  //register new remote method
  Message.remoteMethod(
    'random',
    {
      http: {verb: 'get'},
      returns: {arg: 'messages', type:'array'}
    }
  );


};
