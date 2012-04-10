###
* Node.js - The easter eggs assignment
*
* @author Olle Bröms
###

# Dependencies
net = require 'net'
encryption = require './encryption'

# Server
server = net.Server()

# Client connect
server.on 'connection', (socket) ->
	# Client sent data
	socket.on 'data', (email) ->
		# Escape enter
		email = email.replace /\r\n$/, ''
		
		# Send the secret
		socket.end "Your secret is: #{encryption.crypt email}\n"
	
	socket.setEncoding 'ascii'
	
	# Output welcome text
	socket.write 'Welcome\nEnter your email: '

# Default TCP port is 23
server.listen 1337