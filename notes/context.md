# How to use context propagation:

you may forget to config loopback.context(), it can be

``` js
app.use(loopback.context());
app.use(loopback.token());
```

or define it in middleware.json

``` js
  "session:after": {
    "loopback#context": {},
    "loopback#token": {}
  }
```
p.s. Please update loopback to newest version 2.19.0. Because the previous version(e.g. 2.18.0) will give wrong currentContext in callback function if login a different user in another browser.

source: https://github.com/strongloop/loopback/issues/878

## get current userid / token
``` js
  function getCurrentUserId() {
    var ctx = loopback.getCurrentContext();
    var accessToken = ctx && ctx.get('accessToken');
    var userId = accessToken && accessToken.userId;
    return userId;
  }
```

## get current user

see server/middleware/context-currentUser.js
