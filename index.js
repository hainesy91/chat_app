var express = require('express'); // Use the express library. 
var app = express(); // Create our app. 
var http = require('http');
server = http.createServer(app); // Create an HTTP server.
server.listen(process.env.PORT || 4000); // Listen on the default port, or on 4000 if there's not one.


app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
 res.render('index')
});

app.use('/static', express.static(__dirname + '/public'));

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
    socket.emit('connected');
});

io.sockets.on('chat', function(data) {
  socket.broadcast.emit('chat', data);
});

io.sockets.on('chat', function(data) {
    writeLine(data.name, data.line);
});

io.sockets.on('action', function(data) {
  writeAction(data.name, data.action);
});

io.sockets.on('action', function(data) {
  socket.broadcast.emit('action', data);
});