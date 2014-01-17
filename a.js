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

/*
var open = require('open');
open('C:\firefox.exe');
*/

var open = require('open');
var exepath = "C:\\Program\ Files\ (x86)\\Mozilla\ Firefox\\firefox.exe";
//var programpath = "C:\Program Files (x86)\Mozilla Firefox\firefox.exe";

console.log(exepath);
open(exepath);
//open('C:\Program Files (x86)\Mozilla Firefox\firefox.exe');





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
		
		wolfram(msg);









function wolfram(request){
	var Client = require('node-wolfram');
	var Wolfram = new Client('4LKTW8-3XR8HU4LKU');
	Wolfram.query(request, function(err, result) {
		if(err)
			console.log(err);
		else
		{
			for(var a=0; a<result.queryresult.pod.length; a++)
			{
				var pod = result.queryresult.pod[a];
				console.log(pod.$.title,": ");
				for(var b=0; b<pod.subpod.length; b++)
				{
					var subpod = pod.subpod[b];
					for(var c=0; c<subpod.plaintext.length; c++)
					{
						var text = subpod.plaintext[c];
						console.log('\t', text);
					}
				}
			}
			//io.sockets.emit('message', result.queryresult.pod[1].subpod[0].plaintext[0]);
			sendresponse(result.queryresult.pod[1].subpod[0].plaintext[0],"single");
		}
	});
}


function sendresponse(response,client){
	if(typeof(client)==='undefined') client = "all";

	if (client=="single"){
		socket.emit('message', response);
	}
}























		


		
		//Broadcast to all clients except for one:
        //socket.broadcast.emit('message', msg);

		//Broadcast to all clients in a room:
		//io.sockets.in('room').emit('message', msg);
		
		//Sending a message to a single client:
		//socket.emit('message', "You said: "+msg);
		
		//Broadcast to all connected sockets:
		//io.sockets.emit('message', msg);
    });
});

/*
//Send Youtube video to Chromecast

var chromecast = require('chromecast')();

chromecast.on('device', function(device){

  device.launch('YouTube', {
    v: 'jG2KMkQLZmI'
  }).then(function(){
    console.log('Watch Your TV!');
  }, function(err){
    console.error('Something Went Wrong: ', err);
  });

});

chromecast.discover();
*/















/*
var Client = require('node-wolfram');
var Wolfram = new Client('4LKTW8-3XR8HU4LKU');
Wolfram.query("What day is it today?", function(err, result) {
    if(err)
        console.log(err);
    else
    {
        for(var a=0; a<result.queryresult.pod.length; a++)
        {
            var pod = result.queryresult.pod[a];
            console.log(pod.$.title,": ");
            for(var b=0; b<pod.subpod.length; b++)
            {
                var subpod = pod.subpod[b];
                for(var c=0; c<subpod.plaintext.length; c++)
                {
                    var text = subpod.plaintext[c];
                    console.log('\t', text);
                }
            }
        }
    }
});
*/