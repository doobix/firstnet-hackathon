import React, { Component } from 'react';
import ChatIFrameView from './ChatIFrameView';
import ListView from './ListView';
import MapView from './MapView';
import './App.css';
import { ButtonsGroup, Colors, Icon, InputWithButton } from 'watson-react-components';

const GEO_API = 'http://firstnet18.herokuapp.com/geo';
const WATSON_API = 'http://firstnet18.herokuapp.com/api/speech-to-text/token';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'list',
      isRecording: false,
      stream: null,
      location: '',
      tweetData: null,
    };
  }

  render() {
    let micButton = this.state.isRecording ? <Icon type="microphone" fill={Colors.red_50} /> : <Icon type="microphone" />;
    return (
      <div className="App">
        <div className="content flex-container">
          <div className="top">
            <h2>Tweetpatcher</h2>
            {this.renderTabs()}
          </div>

          <div className="middle">
            {this.renderView()}
          </div>

          <div className="bottom">
            <button onClick={e => this.toggleRecording()}>
              {micButton}
            </button>

            <InputWithButton
              onSubmit={(e) => this.sendLocation()}
              onChange={(e) => this.changeLocation(e)}
              placeholder="Enter a location"
              value={this.state.location}
            />
          </div>
        </div>
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
        }, {
          value: 'chat',
          id: 'chat-button',
          text: 'Chat View',
          selected: this.state.view === 'chat',
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

  sendLocation() {
    const location = this.state.location.replace(/\s/g, '+');
    const data = new FormData();
    data.append("json", JSON.stringify({ location}));

    fetch(GEO_API + '?location=' + location, {
      method: 'GET',
    }).then((response) => {
      return response.text()
    }).then((geoLocationObj) => {
      const { geoLocation } = JSON.parse(geoLocationObj);
      const splitCoords = geoLocation.split(" ");
      const lat = splitCoords[0];
      const long = splitCoords[1];
      console.log('lat:', lat, 'long:', long);
    });
  }

  renderView() {
    switch (this.state.view) {
      case 'chat':
        return <ChatIFrameView />;
      case 'map':
        return <MapView />;
      default:
        return <ListView tweetData={this.state.tweetData} />;
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
