const {server, wsServer} = require('./server');
const stream = require('./public/js/twitter');
const fs = require('fs');
const {tweetExtractor, stringify, counter, trumpify, badwords} = require('./public/js/transforms');
const SocketStream = require('./stream/SocketStream');

wsServer.on('connection', ws => {
    let jsonfile = fs.readFileSync('public/dictionary.json');
    var dictionary = JSON.parse(jsonfile.toString());

    ws.on("message", message => {
        if(message.startsWith("{")){
            let newCensor = JSON.parse(message.toString());
            dictionary.unshift(newCensor);
            fs.writeFile('public/dictionary.json', JSON.stringify(dictionary), function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        }
    });

    const socketStr = new SocketStream(ws);
    stream.pipe(tweetExtractor)
        //.pipe(counter)
        .pipe(trumpify)
        .pipe(stringify)
        //.pipe(badwords)
        .pipe(socketStr);
});


