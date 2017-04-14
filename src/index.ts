import * as Twit from 'twit';
import replies from './replies';


const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const hashtags = (<string>process.env.HASHTAGS).split(',');
const stream = T.stream('statuses/filter', {
  track: hashtags,
});


stream.on('tweet', function (tweet: Twit.Twitter.Status) {
  replyToTweet(tweet);
});

function getRandomReply() {
  const replyLength = replies.length;
  const index = ~~(Math.random() * replyLength + 0.5);
  return replies[index];
}

async function replyToTweet(tweet: Twit.Twitter.Status) {
  try {
    const r = await T.post('statuses/update', {
      in_reply_to_status_id: tweet.id,
      status: `@${tweet.user.screen_name} ${getRandomReply}`,
    });
    if (r.data.error) {
      console.error(r.data.error);
    }
  } catch (e) {
    console.error(e);
  }
}