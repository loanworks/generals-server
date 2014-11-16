var PORT = 4000, URL = 'localhost';

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(PORT, URL);

app.use(function (req, res, next)
{
	res.set('Access-Control-Allow-Origin', '*');
	next()
})

io.of('/home').on('connection', function (socket) {
	console.log("someone connected");
});

console.log('Server is now listening...');
