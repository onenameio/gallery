var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

app.use(express.static(__dirname + '/dist'));

app.all('/*', function(req, res) {
	res.sendfile(__dirname + '/dist/index.html');
});

app.listen(port);