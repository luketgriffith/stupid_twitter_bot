
var config = require('./config'); //set this up from your own acct
var TWITTER_SEARCH_PHRASE = '#alabamafootball OR #rolltide OR #bamafootball OR #bama';

var Twit = require('twit');

var Bot = new Twit({
	consumer_key: config.TWITTER_CONSUMER_KEY,
	consumer_secret: config.TWITTER_CONSUMER_SECRET,
	access_token: config.TWITTER_ACCESS_TOKEN,
	access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET
});

console.log('The bot is running...');

/* BotInit() : To initiate the bot */
function BotInit() {
	Bot.post('statuses/retweet/:id', { id: '669520341815836672' }, BotInitiated);

	function BotInitiated (error, data, response) {
		if (error) {
			console.log('Bot could not be initiated, : ' + error);
		}
		else {
  			console.log('Bot initiated : 669520341815836672');
		}
	}

	BotRetweet();
}

/* BotRetweet() : To retweet the matching recent tweet */
function BotRetweet() {

	var query = {
		q: TWITTER_SEARCH_PHRASE,
		result_type: "recent"
	}

	Bot.get('search/tweets', query, BotGotLatestTweet);

	function BotGotLatestTweet (error, data, response) {
		if (error) {
			console.log('Bot could not find latest tweet, : ' + error);
		}
		else {
			var id = {
				id : data.statuses[0].id_str
			}

			Bot.post('statuses/retweet/:id', id, BotRetweeted);

			function BotRetweeted(error, response) {
				if (error) {
					console.log('Bot could not retweet, : ' + error);
				}
				else {
					console.log('Bot retweeted : ' + id.id);
				}
			}
		}
	}

	/* Set an interval of 30 minutes (in microsecondes) */
	setInterval(BotRetweet, 30*1000);
}

/* Initiate the Bot */
BotInit();
