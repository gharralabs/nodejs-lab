var http = require('http');
var form = require('fs').readFileSync('form.html');
var querystring = require('querystring');
var util = require('util');
var maxData = 2 * 1024 * 1024;
var port = process.env.port || 1337;

http.createServer(function (req, res) {
    
    
    if (req.method == "GET") {
        res.writeHead(200, { 'Content-Type' : 'text/html' });
        res.end(form);
    }


    if (req.method === 'POST') {
        var postData = '';
        req.on('data', function (chunk) {
            if (postData.length > maxData) {
                postData = '';
                this.pause();
                res.writeHead(413);
                response.end('Too large');
            }
            else
                postData += chunk;
        }).on('end', function () {
            if (!postData) {
                response.end();
                return;
            }

            var postDataObject = querystring.parse(postData);
            console.log('User posted: \n' + postData);
            res.end('You posted: \n' + util.inspect(postDataObject));
        });
    }
    
}).listen(port);