import React, { Component } from 'react';
import ListView from './ListView';
import MapView from './MapView';
import './App.css';
import { ButtonsGroup, Colors, Header, Icon, InputWithButton } from 'watson-react-components';

const WATSON_API = 'http://firstnet18.herokuapp.com/api/speech-to-text/token';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'list',
      isRecording: false,
      stream: null,
      location: '',
    };
  }

  render() {
    let micButton = this.state.isRecording ? <Icon type="microphone" fill={Colors.red_50} /> : <Icon type="microphone" />;
    return (
      <div className="App">
        <Header />

        {this.renderTabs()}

        <button onClick={e => this.toggleRecording()}>
          {micButton}
        </button>

        <InputWithButton
          onSubmit={(e) => {
            this.setState({ submitText: e.target.value });
          }}
          onChange={(e) => this.changeLocation(e)}
          placeholder="Enter a location"
          value={this.state.location}
        />

        {this.renderView()}
      </div>
    );
  }

  renderTabs() {
    return (
      <ButtonsGroup
        type="radio"
        name="radio-buttons"
        onClick={e => this.changeView(e)}
        buttons={[{
          value: 'list',
          id: 'list-button',
          text: 'List View',
          selected: this.state.view === 'list',
        }, {
          value: 'map',
          id: 'map-button',
          text: 'Map View',
          selected: this.state.view === 'map',
        }]}
      />
    );
  }

  changeView(event) {
    this.setState({
      view: event.target.value,
    });
  }

  changeLocation(event) {
    this.setState({
      location: event.target.value
    });
  }

  renderView() {
    switch (this.state.view) {
      case 'map':
        return <MapView />;
      default:
        return <ListView />;
    }
  }

  toggleRecording(e) {
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
    fetch(WATSON_API, {
      method: 'POST',
    })
    .then((response) => {
      return response.text();
    }).then((token) => {
      var stream = window.WatsonSpeech.SpeechToText.recognizeMicrophone({
        token: token,
        object_mode: false
      });

      stream.setEncoding('utf8'); // get text instead of Buffers for on data events

      stream.on('data', (data) => {
        console.log(data);
        this.setState({
          location: data,
        });
      });

      stream.on('error', (err) => {
        console.log(err);
      });

      this.setState({ stream });
    }).catch((error) => {
      console.log(error);
    });
  }

  stopRecording() {
    if (this.state.stream) {
      this.state.stream.stop();
    }
  }
}

export default App;
