var http = require('http');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
    '.js' : 'text/javascript',
    '.html' : 'text/html',
    '.css' : 'text/css'
};

http.createServer(function (req, res) {
    
    var lookup = path.basename(decodeURI(req.url)) || 'index.html';
    var f = 'conteudo/' + lookup;
    
    fs.exists(f, function (exists) {
        
        if (exists) {

            fs.readFile(f, function (err, data) {
                if (err) {
                    res.writeHead(500);
                    res.end('Server Error!');
                    return;
                }

                var headers = { 'Content-type' : mimeTypes[path.extname(lookup)] };

                res.writeHead(200, headers);
                res.end(data);
            });
            return;
        }

        res.writeHead(404);
        res.end();

    });
    
}).listen(9999);