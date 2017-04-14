## Twitter Autoreply to hashtags
This is a very simple bot that autoreplies a random reply whenever someone posts something on the monitored hashtags.

### requirements
* Node 7.6+

### config
Environment Variables needed:

* CONSUMER_KEY - Twitter Consumer Key
* CONSUMER_SECRET - Twitter Consumer Secret
* ACCESS_TOKEN - Twitter Access Token
* ACCESS_TOKEN_SECRET - Twitter Access Token secret
* HASHTAGS - Comma seperated list of hashtags to monitor

The replies can be configured in src/replies.ts

### building
```npm run build```

### Features
* Autoreply whenver a tweet is detected.
* multiple hashtags
* random reply, configurable
* auto reconnect on rate limit (streaming API)
