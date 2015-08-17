var http = require('http');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
    '.js' : 'text/javascript',
    '.html' : 'text/html',
    '.css' : 'text/css'
};

var cache = {};

function cacheAndDeliver(f, cb){
    
    if (!cache[f]) {

        fs.readFile(f, function (err, data) {
            if (!err) {
                cache[f] = {
                    content : data,
                    timestamp : Date.now()
                };
            }
            cb(err, data);
        });
        return;
    }
    console.log('carregando ' + f + ' from cache');
    cb(null, cache[f].content);
}

http.createServer(function (req, res) {
    
    var lookup = path.basename(decodeURI(req.url)) || 'index.html';
    var f = 'conteudo/' + lookup;
    
    cacheAndDeliver(f, function (err, data) {
        if (err) {
            res.writeHead(500);
            res.end('Server Error!');
            return;
        }
        
        var headers = { 'Content-type' : mimeTypes[path.extname(lookup)] };
        
        res.writeHead(200, headers);
        res.end(data);
    } );
    
    
}).listen(9999);