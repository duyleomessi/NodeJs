//1. Create a web server
var http = require('http');
var router = require('./router');

http.createServer(function (request, response) {
    router.homeRoute(request, response);
    router.userRoute(request, response);
}).listen(3000, function () {
    console.log('Server running at port 3000');
});



