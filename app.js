var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
var request = require('request');

var appId = '7dc441d3808eb16c0a5555cbb43a7d50';
var appSecret = 'aa440fb370656439c055ce0e4083ffdf';
var crossSiteHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, Accept, Content-Type, X-HTTP-Method-Override, Origin, Pragma, Referer, User-Agent, If-Match, If-None-Match'
};

app.use(express.static(__dirname + '/dist'));

app.get('/api/users/:username', function(req, res) {
    var url = 'http://api.onename.co/v1/users/' + req.param('username') + '?app-id=' + appId + '&app-secret=' + appSecret;

    res.writeHead(200, crossSiteHeaders);
    request.get(url, function (error, response, body) {
        res.write(body);
        res.end();
    });
});

app.get('/api/search/:query', function(req, res) {
    var url = 'http://api.onename.co/v1/search?query=' + req.param('query') + '&app-id=' + appId + '&app-secret=' + appSecret;

    res.writeHead(200, crossSiteHeaders);
    request(url, function (error, response, body) {
        res.write(body);
        res.end();
    });
});

app.all('/*', function(req, res) {
	res.sendfile(__dirname + '/dist/index.html');
});

app.listen(port);

console.log('Running on port ' + port);