

var loopback = require('loopback');
var debug = require('debug')('dw:mixin:createdby');
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function(Model, options) {
  // Model is the model class
  // options is an object containing the config properties from model definition

  // complete source: https://github.com/clarkbw/loopback-ds-timestamp-mixin/blob/master/time-stamp.js
  // exists as node module ! that's better...

  options = _extends({ createdBy: 'createdBy'}, options);

  Model.defineProperty(options.createdBy, {type: 'number', required: false});

  Model.observe('before save', function (ctx, next) {

    // note that createdby is set each time upsert is called, it should be called updatedby...



    var appctx = loopback.getCurrentContext();
   // var token =  appctx.get('accessToken');
    if (appctx) {
      var token = appctx.get('accessToken');
      if (token) {
        var userId = token.userId;
        debug('userId', userId);
        if (ctx.instance) {
          ctx.instance[options.createdBy] = userId;
        } else {
          ctx.data[options.createdBy] = userId;
        }
      }
    }


    next();
  });
}
