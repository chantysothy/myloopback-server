# Facebook connect
*** OUTDATED ***
### Target:

+ Allow account creation through facebook long-term token (from mobile app)
+ Allow LTT-created user account to be updated
+ Allow existing user to link their FB account
+ Allow existing user to log in via their linked facebook account

### Context:
Mobile apps can easily (!) use Facebook SDK to use Facebook LoginButton or FacebookManager.
It can create "Long-term token" which links user to facebook app and can be used from various sdk, including js, ios and android.

Infos: https://developers.facebook.com/docs/facebook-login/access-tokens

Loopback must use this connect to identify and authorize users.

## Step one: create Facebook app
Many tutorials exists, or see FB Documentation: https://developers.facebook.com/docs/facebook-login/overview .
To test API usage and get test tokens, use
https://developers.facebook.com/tools/explorer/

## Step two: implements Facebook login inside app
Also see doc links above.
One simple way is to use cocoapods for iOS and gradle plugin for Android
[...]

Now you should be able to get Long-term token in your app.

## Step three: make loopback able to recognize Facebook tokens and create loopback account

### Add dependencies
 in package.json:
 ``` json
   "dependencies": {
    [...]
     "loopback-component-passport": "^1.5.0",
     "passport-facebook-token": "^3.2.0",
     "express-flash": "0.0.2"
     }
 ```

flash: used for error handling -- NOT USED

create providers.json
update server.js
create models

node_modules/loopback-component-passport/lib/passport-configurator.js, l149
 // var AuthStrategy = require(options.module)[options.strategy || 'Strategy'];
  if (options.strategy=="FacebookTokenStrategy") {
    AuthStrategy = require(options.module);
  }else{
    AuthStrategy = require(options.module)[options.strategy || 'Strategy'];
  }


"clean" server.js and use middlewares / boot script

Create custom routes in boot script
