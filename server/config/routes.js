//
// Injected Dependencies
//
var express = require("express");

var path = require('path');


var router = express.Router({});


module.exports = function(app) {


    //
    // Sets up prerender node middleware
    //
    app.use(require('prerender-node').set('prerenderToken', '4t2HUvWi1HfT6avso0F2'));


    //
    // Used to tell any GET requests on root to point to the client folder
    // Run this on all requests
    //
    app.use('/', express.static(path.join(__dirname + '../../../client')));


    app.get('/sitemap.xml', function(req, res) {

      res.sendFile('sitemap.xml', {root: path.join(__dirname + '../../../client') });

    })


    //
    // This is part of Express' application routing
    // Runs on a get request for the given url
    //
    // Here we have to type out all routes on the site unfortunately
    // TODO: convert to pulling from contentful
    //
    app.get('/liked/', function(req, res) {

      res.sendFile('index.html', {root: path.join(__dirname + '../../../client') });

    });

    app.get('/a-brand-invention-agency/', function(req, res) {

      res.sendFile('index.html', {root: path.join(__dirname + '../../../client') });

    });

    app.get('/projects/*/', function(req, res) {

      res.sendFile('index.html', {root: path.join(__dirname + '../../../client') });

    });

    app.get('/listening/', function(req, res) {

      res.sendFile('index.html', {root: path.join(__dirname + '../../../client') });

    });

    app.get('/making-stuff/', function(req, res) {

      res.sendFile('index.html', {root: path.join(__dirname + '../../../client') });

    });

    app.get('/liked/', function(req, res) {

      res.sendFile('index.html', {root: path.join(__dirname + '../../../client') });

    });

    app.get('/looking-for-you/', function(req, res) {

      res.sendFile('index.html', {root: path.join(__dirname + '../../../client') });

    });

    app.use(function(req, res) {

      res.status(404);
      res.sendFile('index.html', {root: path.join(__dirname + '../../../client') });

    });

    // Difference between use and get basics: http://stackoverflow.com/questions/15601703/difference-between-app-use-and-app-get-in-express-js

}
