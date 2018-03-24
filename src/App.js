import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Recorder from 'recorder-js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRecording: false,
      blob: null,
      audioContext: null,
      recorder: null,
    };
  }

  componentDidMount() {
    const audioContext =  new (window.AudioContext || window.webkitAudioContext)();
    const recorder = new Recorder(audioContext);

    this.setState({
      audioContext,
      recorder,
    });

    navigator.mediaDevices.getUserMedia({audio: true})
      .then(stream => recorder.init(stream))
      .catch(err => console.log('Uh oh... unable to get stream...', err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={e => this.startRecording()}>Start Recording</button>
        <button onClick={e => this.stopRecording()}>Stop Recording</button>
        <button onClick={e => this.download()}>Download</button>
      </div>
    );
  }

  startRecording() {
    this.state.recorder.start()
      .then(() => {
        this.setState({
          isRecording: true
        });
      });
  }

  stopRecording() {
    this.state.recorder.stop()
      .then(({blob, buffer}) => {
        this.setState({ blob });
      });
  }

  download() {
    Recorder.download(this.state.blob, 'my-audio-file');
  }
}

export default App;
