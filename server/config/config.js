//
// Configuration file for node server
//
var path = require('path');

var rootPath = path.normalize(__dirname + '/client/');

module.exports =  {

    development: {
        rootPath: rootPath,
        port: process.env.PORT || 8080
    },
    production: {

        rootPath: rootPath,
        port: process.env.PORT || 8080
    }


}
