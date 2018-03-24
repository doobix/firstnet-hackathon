import React, { Component } from 'react';
import './App.css';
import { Colors, Icon, InputWithButton } from 'watson-react-components';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRecording: false,
      stream: null,
    };
  }

  render() {
    let micButton = this.state.isRecording ? <Icon type="microphone" fill={Colors.red_50} /> : <Icon type="microphone" />;
    return (
      <div className="App">
        <button onClick={e => this.toggleRecording()}>
          {micButton}
        </button>

        <InputWithButton
          onSubmit={(e) => {
            this.setState({ submitText: e.target.value });
          }}
          placeholder="Input some text here"
        />
      </div>
    );
  }

  toggleRecording() {
    if (this.state.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
    this.setState({
      isRecording: !this.state.isRecording,
    });
  }

  startRecording() {
    fetch('/api/speech-to-text/token')
    .then(function(response) {
        return response.text();
    }).then(function (token) {
      var stream = window.WatsonSpeech.SpeechToText.recognizeMicrophone({
        token: token,
        object_mode: false
      });

      stream.setEncoding('utf8'); // get text instead of Buffers for on data events

      stream.on('data', function(data) {
        console.log(data);
      });

      stream.on('error', function(err) {
        console.log(err);
      });

      this.setState({ stream });
    }).catch(function(error) {
      console.log(error);
    });
  }

  stopRecording() {
    if (this.state.stream) {
      this.state.stream.stop.bind(this.state.stream);
    }
  }
}

export default App;
