var express = require('express');
var app = express();

// use dist after tasks are setup
app.get('/', function(req, res) {
    res.sendFile('src/index.html', { root: __dirname });
});

app.use(express.static('src'));

var server = app.listen(3000, function(req, res) {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});
