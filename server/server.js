var loopback = require('loopback');
var boot = require('loopback-boot');
var io = require('socket.io');

var app = module.exports = loopback();
var server = require('http').createServer(app);
io = io.listen(server);

io.sockets.on('connection', function (socket) {
  socket.emit('connected', {hello: 'world'});
  socket.on('connected', function (data) {
    console.log(data);
  });
});

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname);

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
