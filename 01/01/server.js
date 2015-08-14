var http = require('http');
var url = require('url');

var pages = [
    { id : '1', rota : '', saida : 'Woohoo!' },
    { id : '2', rota : 'sobre', saida : 'A simple routing with Node example!' },
    { id : '3', rota : 'outra pagina', saida : function () { return 'Rota:' + this.route; } }
];

http.createServer(function (req, res) {
    
    var id;
    id = url.parse(decodeURI(req.url), true).query.id;
    
    if (id) {
        
        pages.forEach(function (page) {
            
            if (page.id === id) {
                res.writeHead(200, { 'Content-Type' : 'text/html' });
                res.end(typeof page.saida === 'function' ? page.saida() : page.saida);
            }
        });
    }
    
    if (!res.finished) {
        res.writeHead(404);
        res.end('Page Not Found');
    }

}).listen(9999);