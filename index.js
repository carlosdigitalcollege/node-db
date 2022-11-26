const fs = require('fs');
const http = require('http'); //importando a lib http do node
const produto = require('./produto');
const host = 'localhost';
const porta = '8000';


function recepcao(req, res) {
    const rota = req.url.split('?')[0];

    console.log({ req })

    if (req.method === 'GET') {
        if (rota === '/') {
            res.setHeader('Content-Type', 'text/html');
            const html = fs.readFileSync('./welcome.html')
            
            return res.end(html);   
        }
    
        if (rota === '/products/new') {
            res.setHeader('Content-Type', 'text/html');
            const html = fs.readFileSync('./product-form.html')
            
            return res.end(html);   
        }
    
        if (rota === '/api/products') {
            return produto.list(res);
        }
    }

    if (req.method === 'POST') {
        if (rota === '/api/products') {
            return produto.add(res, req)
        }
    }

    return res.end('Erro 404');
}

const server = http.createServer(recepcao);
server.listen(porta, host); 
