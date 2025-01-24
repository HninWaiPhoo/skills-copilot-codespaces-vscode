
// Create web server
var http = require('http');
var server = http.createServer(function(req, res) {
    res.writeHead(200);
    res.end('Hello Http');
});
server.listen(8080);

// Create socket server
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
    // When comment event is received, emit it to all clients
    socket.on('comment', function(data) {
        io.sockets.emit('comment', data);
    });
});

// When comment event is received, add the comment to the list
io.sockets.on('connection', function(socket) {
    socket.on('comment', function(data) {
        comments.push(data);
    });
});

// List of comments
var comments = [];
