const {Transform} = require('stream');
const replaceBy = require( './replaceBy' );

const tweetExtractor = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,
    transform(chunk, encoding, callback){
        const newChunk = chunk.text;
        this.push(newChunk);
        callback();
    }
});

const stringify = new Transform({
    writableObjectMode: true,

    transform(chunk, encoding, callback){
        const newChunk = JSON.stringify(chunk) + '\n';
        this.push(newChunk);
        callback();
    }
});

let count = 0;
const counter = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,

    transform(chunk, encoding, callback){
        count += 1;
        this.push({
            tweet: chunk,
            count
        });
        callback();
    }
});

const trumpify = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,

    transform(chunk, encoding, callback){
        if(chunk !== undefined) {
            let new_word = chunk;
            replaceBy.forEach((value => {
                let reg = new RegExp(value.word, "gi");
                new_word = new_word.replace(reg, value.replace);
            }));
            this.push(new_word);
        }
        callback();
    }
});

module.exports = {
    tweetExtractor,
    stringify,
    counter,
    trumpify,
};
