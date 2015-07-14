var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
var request = require('request');

var appId = 'c9045112f02e9ea859f7928590d6c98f';
var appSecret = '8d78b4fef4dd4e43663b1ef42ca81603d293c8ba90f33e7caadbbdec9ce374b7';

var crossSiteHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, Accept, Content-Type, X-HTTP-Method-Override, Origin, Pragma, Referer, User-Agent, If-Match, If-None-Match'
};

app.use(express.static(__dirname + '/dist'));

app.get('/api/users/:username', function(req, res) {
    var url = 'https://api.onename.com/v1/users/' + req.param('username') + '?app-id=' + appId + '&app-secret=' + appSecret;

    res.writeHead(200, crossSiteHeaders);
    request.get(url, function (error, response, body) {
        res.write(body);
        res.end();
    });
});

app.get('/api/search/:query', function(req, res) {
    var url = 'https://api.onename.com/v1/search?query=' + req.param('query') + '&app-id=' + appId + '&app-secret=' + appSecret;

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