var loopback = require('loopback');

module.exports = function enableAuthentication(server) {
  // enable authentication
  server.enableAuth();
// convert "me" to current logged user ID in URLs - see also middleware.json
  server.middleware('auth', loopback.token({
    model: server.models.AccessToken,
    currentUserLiteral: 'me'
  }));
};
