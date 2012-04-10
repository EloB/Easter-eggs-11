
/*
* Node.js - The easter eggs assignment
*
* @author Olle Bröms
*/

(function() {
  var encryption, net, server;

  net = require('net');

  encryption = require('./encryption');

  server = net.Server();

  server.on('connection', function(socket) {
    socket.on('data', function(email) {
      email = email.replace(/\r\n$/, '');
      return socket.end("Your secret is: " + (encryption.crypt(email)) + "\n");
    });
    socket.setEncoding('ascii');
    return socket.write('Welcome\nEnter your email: ');
  });

  server.listen(1337);

}).call(this);
