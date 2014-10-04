var UserPool = require('../classes/UserPool');
var pool = new UserPool();
console.log(pool.getUsers());


module.exports = function (io) {
    io.on('connection', function (socket) {
        pool.addUser(socket);
        console.log("current id " + socket.id);
        console.log("first id " + pool.getUsers()[0].id);
        socket.emit('news', {
            hello: 'world'
        });

        socket.on('my other event', function (data) {
            console.log(data);
        });

        socket.on('join pool', function (data) {

        });

        socket.on('disconnect', function () {
            io.sockets.emit('user disconnected');
            pool.removeUser(socket.id);
            console.log("user disconnected");
        });
    });
}