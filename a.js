var express = require('express');

var app = express()
  , httpapp = express()
  , fs = require('fs')  
  , options = {
    key: fs.readFileSync('./cert/fdaa0dc6-23f0-420c-8d88-730dbbf659d6.private.key'),
    cert: fs.readFileSync('./cert/fdaa0dc6-23f0-420c-8d88-730dbbf659d6.public.crt'),
    requestCert: true
}
  , http = require('http').createServer(httpapp)
  , server = require('https').createServer(options, handler)  
  , io = require('socket.io').listen(server);


httpapp.get('*',function(req,res){  
    res.redirect('https://127.0.0.1:8080'+req.url)
})

server.listen(8080);
http.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
    socket.on('message', function (msg) {
        console.log('Message Received: ', msg);
		//Broadcast to all clients except for one:
        //socket.broadcast.emit('message', msg);

		//Broadcast to all clients in a room:
		//io.sockets.in('room').emit('message', msg);
		
		//Sending a message to a single client:
		//socket.emit('message', "You said: "+msg);
		
		//Broadcast to all connected sockets:
		io.sockets.emit('message', msg);
    });
});


/*
var app = require('https').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
    socket.on('message', function (msg) {
        console.log('Message Received: ', msg);
        socket.broadcast.emit('message', msg);
    });
});

*/