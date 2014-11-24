var PORT = 4000, URL = '192.168.254.107';

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var redis = require('redis');
var client = redis.createClient(6379,'192.168.254.112');
client.auth("angpoginggwapongpaulon");
client.flushdb();
server.listen(PORT, URL);

app.use(function (req, res, next)
{
	res.set('Access-Control-Allow-Origin', '*');
	next()
});

io.of('/lobby').on('connection', function (socket) {
	console.log("someone connected");
	socket.on('join',function(data,fn){
		var socket_id = socket.id;				
		client.get('user:'+data.user,function(err,ret){			
			if(err){				
				fn(false);
			}else{
				var ret_json = JSON.parse(ret);				
				if(ret_json){					
					socket.join('generals-lobby');					
					fn({success:true});
					client.smembers('users',function(err,ret){						
						io.of('/lobby').in('generals-lobby').emit('update users list',ret);
					});	
					
				}else{
					fn({success:false});
				}	
				//io.of('/lobby').socket(socket_id).join('lobby');
				//socket.emit('update users list',{useremail:ret_json.email});
				//io.of('/lobby').emit('update users list',{useremail:ret_json.email});
			}	
		});
		//console.log(session.user.username + " is connected");
	});
	socket.on("request users list",function(fn){
		client.smembers('users',function(err,ret){
			fn(ret);
		});			
	});
	socket.on('message:sent',function(data,fn){
		fn('return success :'+data);
	});

});

console.log('Server is now listening...');
