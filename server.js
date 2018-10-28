const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer();
const wsServer = new WebSocket.Server({server});

server.on('request', (request, response) => {
    if(request.url.endsWith(".js") || request.url.endsWith(".css")){
        if(fs.existsSync("./public" + request.url)){
            const fileSrc = fs.createReadStream("./public" + request.url);
            fileSrc.pipe(response);
        }
    } else {
        const fileSrc = fs.createReadStream("./public/index.html");
        fileSrc.pipe(response);
    }
});

server.listen(5000);

module.exports ={
    server,
    wsServer,
};
