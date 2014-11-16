var PORT = 4000, URL = 'localhost';
var path = require('path');
var io = require(path.join(__dirname, 'node_modules/socket.io')).listen(PORT,URL);

//io.set('origins', '192.168.254.111:8081');

var home = io.of('/home')
	.on('connection',function(socket){
		//console.log(io.transports[socket.id].name);
		console.log("someone connected");
		socket.on('join lobby',function(data,fn){

		});
	});	

console.log('Server is now listening...');
