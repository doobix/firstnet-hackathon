import React, { Component } from 'react';
import './ListView.css';

class ListView extends Component {
  render() {
    console.log(this.props.tweetData);

    return (
      <div>
        <div className="tweet">
          <p className="tweet-info">
            <span className="tweet-name">Testing Tester</span>
            <span className="tweet-username">@test123</span>
            <span className="tweet-time">12:34pm</span>
          </p>
          <p className="tweet-post">foo bar baz</p>
        </div>
      </div>
    );
  }
}

export default ListView;
