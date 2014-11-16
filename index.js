var PORT = 4000, URL = 'localhost';
var path = require('path');
var io = require(path.join(__dirname, 'node_modules/socket.io/')).listen(PORT,URL);

var home = io.of('/home')
	.on('connection',function(socket){
		//console.log(io.transports[socket.id].name);
		console.log("someone connected");		
	});	

console.log('Server is now listening...');
