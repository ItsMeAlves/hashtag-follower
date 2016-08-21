var Twitter = require("twitter");
var readline = require("readline");

var input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

input.question("What do you want to track? ", (answer) => {
    client.stream("statuses/filter", {track: answer}, (stream) => {
        stream.on("data", (event) => {
            console.log(event.text);
        });

        stream.on("error", (error) => {
            console.log(error.message);
        });
    });

    input.close();
});