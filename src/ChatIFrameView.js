import React, { Component } from 'react';

class ChatIFrameView extends Component {
  render() {
    return (
      <iframe
        src="http://firstnet18.herokuapp.com/"
        height="100%"
        width="100%"
        title="chatbot"
      >
      </iframe>
    );
  }
}

export default ChatIFrameView;
