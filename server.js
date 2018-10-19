const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer();
const wsServer = new WebSocket.Server({server});

server.on('request', (request, response) => {
    if(request.url === '/style.css'){
        console.log('ok');
        const fileStyle = fs.createReadStream("style.css");
        fileStyle.pipe(response);
    }
    const fileSrc = fs.createReadStream("index.html");
    fileSrc.pipe(response);
});

server.listen(5000);

module.exports ={
    server,
    wsServer,
};
