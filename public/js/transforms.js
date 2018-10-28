const {Transform} = require('stream');
const badwordsArray = require('badwords/array');
const fs = require('fs');


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

//First project

const trumpify = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,

    transform(chunk, encoding, callback){
        if(chunk !== undefined) {
            let jsonfile = fs.readFileSync('public/dictionary.json');
            var dictionary = JSON.parse(jsonfile.toString());

            let new_word = chunk;
            dictionary.forEach(value =>{
                let reg = new RegExp(value.word, "gi");
                new_word = new_word.replace(reg, value.replace);
            });
            this.push(new_word);
        }
        callback();
    }
});

//Second Project
const badwords = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,

    transform(chunk, encoding, callback){
        if(chunk !== undefined){
            let tweet = chunk.toString();
            let tweetPonctuationLess = tweet.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

            let tweetWords = tweetPonctuationLess.split(' ');

            tweetWords.forEach(value => {
                if(badwordsArray.indexOf(value) > -1){
                    this.push(value);
                }
            });
        }
        callback();
    }
});

module.exports = {
    tweetExtractor,
    stringify,
    counter,
    trumpify,
    badwords,
};
