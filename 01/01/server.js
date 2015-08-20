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

    fs.stat(f, function (err, stats) {
        var ultimaModificacao = Date.parse(stats.ctime);
        var sofreuAtualizacao = (cache[f] && lastChanged > cache[f].timestamp);

        if (!cache[f] || sofreuAtualizacao) {
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
    });
    
    console.log('carregando ' + f + ' from cache');
    cb(null, cache[f].content);    
}

http.createServer(function (req, res) {
    
    var lookup = path.basename(decodeURI(req.url)) || 'index.html';
    var f = 'conteudo/' + lookup;
    
    fs.exists(f, function (exists) {
        if (exists) {
            var headers = { 'Content-type' : mimeTypes[path.extname(f)] };

            if (cache[f]) {
                response.writeHead(200, headers);
                response.end(cached[f].content);
                return;
            }
        }
    });

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