module.exports = function(Model, options) {
  // Model is the model class
  // options is an object containing the config properties from model definition

  // complete source: https://github.com/clarkbw/loopback-ds-timestamp-mixin/blob/master/time-stamp.js
  // exists as node module ! that's better...

  if (Model.settings.validateUpsert && options.required) {
    console.warn('TimeStamp mixin requires validateUpsert be false. See @clarkbw/loopback-ds-timestamp-mixin#10');
  }
  Model.settings.validateUpsert = false;

  Model.defineProperty("createdAt", {type: Date, required: false, defaultFn: 'now'});
  Model.defineProperty("updatedAt", {type: Date, required: false});

  Model.observe('before save', function (ctx, next) {
    console.log('timsStamp %s', new Date());

    if (ctx.instance) {

      ctx.instance["updatedAt"] = new Date();
    } else {

      ctx.data["updatedAt"] = new Date();
    }
    next();
  });
}
