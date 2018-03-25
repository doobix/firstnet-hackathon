import React, { Component } from 'react';
import { loadModules } from 'esri-loader';

const options = {
  url: 'https://js.arcgis.com/4.6/'
};

const styles =  {
  container: {
    height: '100vh',
    width: '100vw'
  },
  mapDiv: {
    padding: 0,
    margin: 0,
    height: '100vw'
  },
}

class ArcGisMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'loading'
    }
  }

  componentDidMount() {
    const coords = this.props.coords.coords;
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/Graphic', 'esri/symbols/SimpleMarkerSymbol', 'esri/Color'], options)
      .then(([Map, MapView, SimpleMarkerSymbol, Color, Graphic]) => {
        const map = new Map({ basemap: "streets" });
        const view = new MapView({
          container: "viewDiv",
          map,
          zoom: 16,
          center: coords
        });
        view.then(() => {
          this.setState({
            map,
            view,
            status: 'loaded',
          });
        });
      })
    };


  renderMap() {
    if(this.state.status === 'loading') {
      return <div>loading</div>;
    }
  }

  render() {
    console.log(this.state)
    return (
      <div style={styles.container}>
        <div id='viewDiv' style={ styles.mapDiv } >
          {this.renderMap()}
        </div>
      </div>
    )
  }
}

export default ArcGisMap;
