var app = require('express')();
var cors = require('cors');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(cors());

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('socket: '+socket.id+'|message:'+ msg);
    io.emit('chat message', 'From: '+socket.id+':'+msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
