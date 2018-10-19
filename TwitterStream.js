const {Readable} = require('stream');

class TwitterStream extends Readable{
    constructor(twitterclient){
        super({objectMode: true});
        this.client = twitterclient;
    }

    _read(){}

    track(query){
        this.stream = this.client.stream ('statuses/filter', {track : query});
        this.stream.on('data', tweet => this.push(tweet));
        this.stream.on('error', err => console.error(err));
    }
}
module.exports = TwitterStream;
