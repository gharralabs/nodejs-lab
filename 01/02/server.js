var http = require('http');
var form = require('fs').readFileSync('form.html');
var querystring = require('querystring');
var util = require('util');

var port = process.env.port || 1337;
http.createServer(function (req, res) {
    
    
    if (req.method == "GET") {
        res.writeHead(200, { 'Content-Type' : 'text/html' });
        res.end(form);
    }


    if (req.method === 'POST') {
        var postData = '';
        req.on('data', function (chunk) {
            postData += chunk;
        }).on('end', function () {
            var postDataObject = querystring.parse(postData);
            console.log('User posted: \n' + postData);
            res.end('You posted: \n' + util.inspect(postDataObject));
        });
    }
    
}).listen(port);