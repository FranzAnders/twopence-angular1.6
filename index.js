
var http = require("http");

var express = require("express");


var searches = {};

var env = 'production';

var app = express();

var server = http.createServer(app)

var config = require('./server/config/config')[env];

/**
 * Config Files
 */
require('./server/config/routes')(app);


/**
 * Server Listening on
 */
server.listen(config.port, function() {

    console.log("http server listening on", config.port)

});



app;
