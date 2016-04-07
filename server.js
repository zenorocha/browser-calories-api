var Hapi = require('hapi');

// -- Setup --------------------------------------------------------------------

var server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 4000
});

server.route([
  {
    method: 'GET',
    path: '/',
    handler: require('./controllers/index')
  }
]);

// -- Start --------------------------------------------------------------------

server.register({
  register: require('good'),
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        log: '*',
        error: '*'
      }
    }]
  }
}, function (err) {
  if (err) {
    throw err;
  }

  if (!module.parent) {
    server.start(function () {
      server.log('info', 'Server running at: ' + server.info.uri);
    });
  }
});

module.exports = server;
