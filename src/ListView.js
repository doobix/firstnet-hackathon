import React, { Component } from 'react';
import './ListView.css';

class ListView extends Component {
  render() {
    if (!this.props.tweetData) {
      return <img src="/tweetpatcher.png" />;
    }

    const tweets = []
    this.props.tweetData.forEach((tweet, index) => {
      tweets.push(this.renderTweet(tweet, index));
    });

    return (
      <div>
        {tweets}
      </div>
    );
  }

  renderTweet(tweet, index) {
    return (
      <div className="tweet" key={index}>
        <p className="tweet-info">
          <span className="tweet-name">{tweet.user.name}</span>
          <span className="tweet-username">@{tweet.user.screen_name}</span>
        </p>
        <p className="tweet-post">{tweet.text}</p>
        <p className="tweet-info">
          <span className="tweet-time">{tweet.created_at}</span>
        </p>
      </div>
    );
  }
}

export default ListView;
