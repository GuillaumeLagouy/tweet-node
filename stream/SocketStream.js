const {Writable} = require('stream');

class SocketStream extends Writable{
    constructor(ws){
        super();
        this.ws = ws;
    }

    _write(chunk, encoding, callback){
        if(this.ws.readyState === this.ws.OPEN)
            this.ws.send(chunk.toString());
        callback();
    }
}
module.exports = SocketStream;
