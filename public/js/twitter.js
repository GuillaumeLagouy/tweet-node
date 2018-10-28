const TwitterStream = require('../../stream/TwitterStream');
const dotenv = require('dotenv');
const Twitter = require('twitter');

dotenv.config();

const twitterClient = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const stream = new TwitterStream(twitterClient);
stream.track("Trump");

module.exports = stream;
